import {readdir, stat} from "fs/promises";
import {join} from "path";

type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/**
 * Check if a directory name is a route group (starts with parentheses)
 */
function isRouteGroup(dirName: string): boolean {
  return dirName.startsWith("(") && dirName.endsWith(")");
}

/**
 * Get all MDX file names from a directory recursively (excluding meta.json and index.mdx)
 * Route groups (folders starting with parentheses) are ignored in path construction
 */
async function getMdxFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  try {
    const files = await readdir(dir);
    const mdxFiles: string[] = [];

    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);

      if (stats.isFile() && file.endsWith(".mdx") && file !== "index.mdx") {
        // Get relative path from base directory, removing route groups
        const relativePath = filePath.replace(baseDir, "").replace(/\\/g, "/").replace(/^\//, ""); // Remove leading slash

        // Split path and filter out route groups and empty parts
        const pathParts = relativePath.split("/").filter((part) => part && !isRouteGroup(part));

        // Remove the filename (last part) and extension
        const filename = pathParts.pop()?.replace(".mdx", "") || "";

        // Construct route path: if there are path parts, join them with filename, otherwise just filename
        const routePath = pathParts.length > 0 ? `${pathParts.join("/")}/${filename}` : filename;

        mdxFiles.push(routePath);
      } else if (stats.isDirectory()) {
        // Recursively scan subdirectories
        const subFiles = await getMdxFiles(filePath, baseDir);

        mdxFiles.push(...subFiles);
      }
    }

    return mdxFiles.sort();
  } catch {
    return [];
  }
}

/**
 * Produce locale-aware redirects for `/docs/...` sources.
 *
 * Every internal docs link in MDX is rewritten by `LocaleLink` to include
 * the current locale prefix (`/cn/docs/...` for Chinese, `/docs/...` for
 * the default `en` locale — Fumadocs strips the prefix for the default
 * language). To make a single conceptual redirect work in every locale,
 * we emit two Next.js rules per mapping:
 *
 *  1. A locale-prefixed source -> locale-prefixed destination (keeps the
 *     user in the same locale, e.g. /cn/docs/handbook/colors ->
 *     /cn/docs/react/getting-started/colors).
 *  2. A bare source -> default-locale destination (covers external links
 *     and crawlers landing on the un-prefixed URL).
 *
 * Both `source` and `destination` MUST start with `/docs/`.
 */
function localizedDocsRedirect(source: string, destination: string): Redirect[] {
  if (!source.startsWith("/docs/") || !destination.startsWith("/docs/")) {
    throw new Error(
      `localizedDocsRedirect expects /docs/... source and destination, got ${source} -> ${destination}`,
    );
  }

  return [
    // Locale-prefixed (preserves the visitor's current language).
    {
      destination: `/:lang${destination}`,
      permanent: true,
      source: `/:lang(en|cn)${source}`,
    },
    // Bare path (no locale) -> default locale.
    {
      destination: `/en${destination}`,
      permanent: true,
      source,
    },
  ];
}

/**
 * Convenience: turn a list of {source, destination} pairs into the full
 * locale-aware redirect set.
 */
function localizedDocsRedirects(
  pairs: ReadonlyArray<{source: string; destination: string}>,
): Redirect[] {
  return pairs.flatMap(({destination, source}) => localizedDocsRedirect(source, destination));
}

/**
 * Generate redirects from `/docs/<prefix>/<route>` to
 * `/docs/react/<prefix>/<route>` (i.e. promoting the framework-agnostic
 * legacy URL to the `react` namespace), in both locale and non-locale form.
 */
function generateRedirects(routes: string[], prefix: string): Redirect[] {
  return localizedDocsRedirects(
    routes.map((route) => ({
      destination: `/docs/react/${prefix ? `${prefix}/` : ""}${route}`,
      source: `/docs/${prefix ? `${prefix}/` : ""}${route}`,
    })),
  );
}

/**
 * Main function to generate all redirects
 */
export async function getRedirects(): Promise<Redirect[]> {
  // Content lives under `content/docs/{en,cn}/react/...` because Fumadocs is
  // configured with `parser: "dir"` for i18n. The English copy is the source
  // of truth for the route list, so we enumerate redirects from there.
  const rootDir = join(process.cwd(), "content/docs/en/react");
  const redirects: Redirect[] = [];

  // Theme builder redirect - redirect /theme to /themes
  redirects.push({
    destination: "/themes",
    permanent: true,
    source: "/theme",
  });

  // Blog moved under [lang] for i18n. Redirect legacy /blog and /blog/<slug>
  // to the default-locale URL so old links keep working.
  redirects.push(
    {
      destination: "/en/blog",
      permanent: true,
      source: "/blog",
    },
    {
      destination: "/en/blog/:slug",
      permanent: true,
      source: "/blog/:slug",
    },
  );

  // Showcase moved under [lang] for i18n. Redirect legacy /showcase and
  // /showcase/<id> to the default-locale URL so old links keep working.
  redirects.push(
    {
      destination: "/en/showcase",
      permanent: true,
      source: "/showcase",
    },
    {
      destination: "/en/showcase/:id",
      permanent: true,
      source: "/showcase/:id",
    },
  );

  // Framework root redirects - redirect /react, /web, and /native to their respective docs
  redirects.push(
    {
      destination: "/docs/react/getting-started",
      permanent: true,
      source: "/react",
    },
    {
      destination: "/docs/react/getting-started",
      permanent: true,
      source: "/web",
    },
    {
      destination: "/docs/native/getting-started",
      permanent: true,
      source: "/native",
    },
  );

  // Root redirects (bare /docs and locale-prefixed /en/docs, /cn/docs).
  redirects.push(
    {
      destination: "/en/docs/react/getting-started",
      permanent: true,
      source: "/docs",
    },
    // Locale-prefixed root redirect (i18n)
    // Without these, /en/docs and /cn/docs hit the catch-all route with no slug
    // and 404 because there is no content/docs/{locale}/index.mdx.
    {
      destination: "/:lang/docs/react/getting-started",
      permanent: true,
      source: "/:lang(en|cn)/docs",
    },
  );

  // Framework root redirects under /docs (parallel to /react and /native at
  // the site root). Without these, links like /docs/react and /docs/native
  // 404 because there is no content/docs/{react,native}/index.mdx.
  redirects.push(
    ...localizedDocsRedirects([
      {destination: "/docs/react/getting-started", source: "/docs/react"},
      {destination: "/docs/native/getting-started", source: "/docs/native"},
    ]),
  );

  // Bare /docs/components -> the components index page
  redirects.push(...localizedDocsRedirect("/docs/components", "/docs/react/components"));

  // Redirect /docs/getting-started to /docs/react/getting-started
  redirects.push(...localizedDocsRedirect("/docs/getting-started", "/docs/react/getting-started"));

  // Getting Started pages - now includes (overview), (handbook), and (ui-for-agents) route groups
  const gettingStartedDir = join(rootDir, "getting-started");
  const gettingStartedPages = await getMdxFiles(gettingStartedDir);

  redirects.push(...generateRedirects(gettingStartedPages, "getting-started"));

  // Backward compatibility: redirect old get-started paths to new getting-started paths
  redirects.push(
    ...gettingStartedPages.flatMap((page) =>
      localizedDocsRedirect(`/docs/get-started/${page}`, `/docs/react/getting-started/${page}`),
    ),
  );

  // Backward compatibility: redirect old root paths to new getting-started paths
  redirects.push(
    ...localizedDocsRedirects([
      {destination: "/docs/react/getting-started", source: "/docs/introduction"},
      {destination: "/docs/react/getting-started/quick-start", source: "/docs/quick-start"},
      {destination: "/docs/react/components", source: "/docs/components-list"},
      {
        destination: "/docs/react/getting-started/design-principles",
        source: "/docs/react/design-principles",
      },
      {
        destination: "/docs/react/getting-started/design-principles",
        source: "/docs/design-principles",
      },
    ]),
  );

  // Releases (index and versions)
  redirects.push(...localizedDocsRedirect("/docs/changelog", "/docs/react/releases"));

  const releasesDir = join(rootDir, "releases");
  const releasesVersions = await getMdxFiles(releasesDir);

  redirects.push(...generateRedirects(releasesVersions, "releases"));

  // Backward compatibility: redirect old changelog paths to new releases paths
  redirects.push(...localizedDocsRedirect("/docs/react/changelog", "/docs/react/releases"));

  // Generate backward compatibility redirects for all changelog version pages
  releasesVersions.forEach((version) => {
    redirects.push(
      ...localizedDocsRedirect(
        `/docs/react/changelog/${version}`,
        `/docs/react/releases/${version}`,
      ),
      ...localizedDocsRedirect(`/docs/changelog/${version}`, `/docs/react/releases/${version}`),
    );
  });

  // Components - now organized in categorized subdirectories with route groups
  const componentsDir = join(rootDir, "components");
  const components = await getMdxFiles(componentsDir);

  redirects.push(...generateRedirects(components, "components"));

  // Component name redirects - backward compatibility for renamed components
  redirects.push(
    ...localizedDocsRedirects([
      {
        destination: "/docs/react/components/typography",
        source: "/docs/react/components/text",
      },
      {
        destination: "/docs/react/components/text-area",
        source: "/docs/react/components/textarea",
      },
      {
        destination: "/docs/react/components/combo-box",
        source: "/docs/react/components/combobox",
      },
      {
        destination: "/docs/react/components/list-box",
        source: "/docs/react/components/listbox",
      },
      {
        destination: "/docs/react/components/number-field",
        source: "/docs/react/components/numberfield",
      },
    ]),
  );

  // Handbook migration: redirect old handbook paths to new getting-started paths
  // Handbook pages are now under getting-started/(handbook)/
  const handbookPages = ["colors", "theming", "styling", "animation", "composition", "dark-mode"];

  redirects.push(
    ...handbookPages.flatMap((page) => [
      ...localizedDocsRedirect(
        `/docs/react/handbook/${page}`,
        `/docs/react/getting-started/${page}`,
      ),
      ...localizedDocsRedirect(`/docs/handbook/${page}`, `/docs/react/getting-started/${page}`),
    ]),
  );

  // UI for Agents migration: redirect old ui-for-agents paths to new getting-started paths
  // UI for Agents pages are now under getting-started/(ui-for-agents)/
  const uiForAgentsPages = ["llms-txt", "mcp-server"];

  redirects.push(
    ...uiForAgentsPages.flatMap((page) => [
      ...localizedDocsRedirect(
        `/docs/react/ui-for-agents/${page}`,
        `/docs/react/getting-started/${page}`,
      ),
      ...localizedDocsRedirect(
        `/docs/ui-for-agents/${page}`,
        `/docs/react/getting-started/${page}`,
      ),
    ]),
  );

  return redirects;
}
