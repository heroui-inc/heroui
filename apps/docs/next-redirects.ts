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
 * Generate redirects for routes
 */
function generateRedirects(routes: string[], prefix: string): Redirect[] {
  return routes.map((route) => ({
    destination: `/docs/react/${prefix ? `${prefix}/` : ""}${route}`,
    permanent: true,
    source: `/docs/${prefix ? `${prefix}/` : ""}${route}`,
  }));
}

/**
 * Main function to generate all redirects
 */
export async function getRedirects(): Promise<Redirect[]> {
  const rootDir = join(process.cwd(), "content/docs/react");
  const redirects: Redirect[] = [];

  // Theme builder redirect - redirect /theme to /themes
  redirects.push({
    destination: "/themes",
    permanent: true,
    source: "/theme",
  });

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

  // Root redirect
  redirects.push({
    destination: "/docs/react/getting-started",
    permanent: true,
    source: "/docs",
  });

  // Redirect /docs/getting-started to /docs/react/getting-started
  redirects.push({
    destination: "/docs/react/getting-started",
    permanent: true,
    source: "/docs/getting-started",
  });

  // Getting Started pages - now includes (overview), (handbook), and (ui-for-agents) route groups
  const gettingStartedDir = join(rootDir, "getting-started");
  const gettingStartedPages = await getMdxFiles(gettingStartedDir);

  redirects.push(...generateRedirects(gettingStartedPages, "getting-started"));

  // Backward compatibility: redirect old get-started paths to new getting-started paths
  redirects.push(
    ...generateRedirects(gettingStartedPages, "get-started").map((redirect) => ({
      ...redirect,
      destination: redirect.destination.replace("/get-started/", "/getting-started/"),
    })),
  );

  // Backward compatibility: redirect old root paths to new getting-started paths
  redirects.push(
    {
      destination: "/docs/react/getting-started",
      permanent: true,
      source: "/docs/introduction",
    },
    {
      destination: "/docs/react/getting-started/quick-start",
      permanent: true,
      source: "/docs/quick-start",
    },
    {
      destination: "/docs/react/components",
      permanent: true,
      source: "/docs/components-list",
    },
    {
      destination: "/docs/react/getting-started/design-principles",
      permanent: true,
      source: "/docs/react/design-principles",
    },
    {
      destination: "/docs/react/getting-started/design-principles",
      permanent: true,
      source: "/docs/design-principles",
    },
  );

  // Releases (index and versions)
  redirects.push({
    destination: "/docs/react/releases",
    permanent: true,
    source: "/docs/changelog",
  });

  const releasesDir = join(rootDir, "releases");
  const releasesVersions = await getMdxFiles(releasesDir);

  redirects.push(...generateRedirects(releasesVersions, "releases"));

  // Backward compatibility: redirect old changelog paths to new releases paths
  redirects.push({
    destination: "/docs/react/releases",
    permanent: true,
    source: "/docs/react/changelog",
  });

  // Generate backward compatibility redirects for all changelog version pages
  releasesVersions.forEach((version) => {
    // Redirect /docs/react/changelog/${version} -> /docs/react/releases/${version}
    redirects.push({
      destination: `/docs/react/releases/${version}`,
      permanent: true,
      source: `/docs/react/changelog/${version}`,
    });
    // Redirect /docs/changelog/${version} -> /docs/react/releases/${version}
    redirects.push({
      destination: `/docs/react/releases/${version}`,
      permanent: true,
      source: `/docs/changelog/${version}`,
    });
  });

  // Components - now organized in categorized subdirectories with route groups
  const componentsDir = join(rootDir, "components");
  const components = await getMdxFiles(componentsDir);

  redirects.push(...generateRedirects(components, "components"));

  // Component name redirects - backward compatibility for renamed components
  redirects.push(
    {
      destination: "/docs/react/components/text-area",
      permanent: true,
      source: "/docs/react/components/textarea",
    },
    {
      destination: "/docs/react/components/combo-box",
      permanent: true,
      source: "/docs/react/components/combobox",
    },
    {
      destination: "/docs/react/components/list-box",
      permanent: true,
      source: "/docs/react/components/listbox",
    },
  );

  // Handbook migration: redirect old handbook paths to new getting-started paths
  // Handbook pages are now under getting-started/(handbook)/
  const handbookPages = ["colors", "theming", "styling", "animation", "composition"];

  redirects.push(
    ...handbookPages.map((page) => ({
      destination: `/docs/react/getting-started/${page}`,
      permanent: true,
      source: `/docs/react/handbook/${page}`,
    })),
    // Also handle /docs/handbook/* paths
    ...handbookPages.map((page) => ({
      destination: `/docs/react/getting-started/${page}`,
      permanent: true,
      source: `/docs/handbook/${page}`,
    })),
  );

  // UI for Agents migration: redirect old ui-for-agents paths to new getting-started paths
  // UI for Agents pages are now under getting-started/(ui-for-agents)/
  const uiForAgentsPages = ["llms-txt", "mcp-server"];

  redirects.push(
    ...uiForAgentsPages.map((page) => ({
      destination: `/docs/react/getting-started/${page}`,
      permanent: true,
      source: `/docs/react/ui-for-agents/${page}`,
    })),
    // Also handle /docs/ui-for-agents/* paths
    ...uiForAgentsPages.map((page) => ({
      destination: `/docs/react/getting-started/${page}`,
      permanent: true,
      source: `/docs/ui-for-agents/${page}`,
    })),
  );

  return redirects;
}
