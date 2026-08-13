import type {StatusChipStatus} from "@/components/status-chip";
import type {Metadata} from "next";

import {readFile} from "node:fs/promises";
import {join} from "node:path";

import {createRelativeLink} from "fumadocs-ui/mdx";
import {notFound} from "next/navigation";
import {Suspense, cache} from "react";

import {CopyNativeSetupPrompt, CopySetupPrompt} from "@/components/ai/copy-setup-prompt";
import {ViewOptions} from "@/components/ai/page-actions";
import {ComponentLinks} from "@/components/component-links";
import {ComponentPreview, ComponentPreviewFallback} from "@/components/component-preview";
import {ComponentsCategory} from "@/components/components-category";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/fumadocs/layouts/notebook/page";
import {LocaleLink} from "@/components/locale-link";
import {ComponentsCategory as NativeComponentsCategory} from "@/components/native/components-category";
import {NewsletterForm} from "@/components/newsletter-form";
import {PRContributors, fetchPRContributors} from "@/components/pr-contributors";
import StatusChip from "@/components/status-chip";
import {siteConfig} from "@/config/site";
import {getComponentCount, getExampleCount} from "@/demos";
import {getDocsSeoMetadata} from "@/lib/docs-seo";
import {getBreadcrumbJsonLd, getTechArticleJsonLd} from "@/lib/json-ld";
import {absoluteUrl, getLocalizedAlternates, localizedPath, stripLocale} from "@/lib/seo";
import {source} from "@/lib/source";
import {getMDXComponents} from "@/mdx-components";
import {
  extractGithubFromMDX,
  extractImageFromMDX,
  extractLinksFromMDX,
} from "@/utils/extract-links";
// import { getGithubLastEdit } from "fumadocs-core/server";

const componentStatusIcons = ["preview", "new", "updated"];

const getRawMDXContent = cache(async (pagePath: string): Promise<string> => {
  try {
    // `page.path` already includes the locale prefix when using
    // `parser: "dir"`, so we must not prepend the locale again.
    const filePath = join(process.cwd(), "content/docs", pagePath);

    return await readFile(filePath, "utf-8");
  } catch {
    return "";
  }
});

export default async function Page(props: {params: Promise<{lang: string; slug?: string[]}>}) {
  const params = await props.params;

  const page = source.getPage(params.slug, params.lang);

  if (!page) notFound();

  const MDXContent = page.data.body;
  const isComponentStatusIcon = page.data.icon && componentStatusIcons.includes(page.data.icon);
  const showCopyPrompt =
    page.url.endsWith("/react/getting-started") ||
    page.url.endsWith("/react/getting-started/quick-start");
  const showNativeCopyPrompt =
    page.url.endsWith("/native/getting-started") ||
    page.url.endsWith("/native/getting-started/quick-start");

  // TODO: add github last edit
  // const lastEditTime = await getGithubLastEdit({
  //   owner: "heroui-inc",
  //   repo: "heroui",
  //   path: `apps/docs/content/docs/${page.path}`,
  // });

  // Read raw MDX content for frontmatter extraction
  const rawContent = await getRawMDXContent(page.path);

  // Extract links from MDX content
  const links = extractLinksFromMDX(rawContent);

  // Extract GitHub info from MDX content
  const githubInfo = extractGithubFromMDX(rawContent);

  // Fetch PR contributors if github info is available
  const contributors = githubInfo?.pull ? await fetchPRContributors(githubInfo.pull) : undefined;

  const slugParts = params.slug ?? [];
  const pagePath = `/docs/${slugParts.join("/")}`;
  const pageUrl = absoluteUrl(localizedPath(params.lang, pagePath));
  const seoMetadata = getDocsSeoMetadata(params.lang, pagePath);

  const breadcrumbItems = [
    {name: "Home", url: absoluteUrl(localizedPath(params.lang))},
    {name: "Docs", url: absoluteUrl(localizedPath(params.lang, "/docs"))},
    ...slugParts.map((segment, i) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      url: absoluteUrl(localizedPath(params.lang, `/docs/${slugParts.slice(0, i + 1).join("/")}`)),
    })),
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{__html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbItems))}}
        type="application/ld+json"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getTechArticleJsonLd({
              description: seoMetadata?.description ?? page.data.description ?? "",
              title: seoMetadata?.title ?? page.data.title,
              url: pageUrl,
            }),
          ),
        }}
      />
      <DocsPage
        full={page.data.full}
        toc={page.data.toc}
        // TODO: add github last edit
        // lastUpdate={lastEditTime}
        tableOfContent={{
          footer: <NewsletterForm />,
          style: "normal",
        }}
      >
        <section className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <DocsTitle className="flex items-center gap-2">
              {page.data.title}
              {!!isComponentStatusIcon && (
                <StatusChip className="w-fit" status={page.data.icon as StatusChipStatus} />
              )}
            </DocsTitle>
            {page.data.toc.length > 0 && (
              <div className="flex flex-wrap items-center justify-start gap-2">
                {!!showCopyPrompt && <CopySetupPrompt />}
                {!!showNativeCopyPrompt && <CopyNativeSetupPrompt />}
                <ViewOptions markdownUrl={`${page.url}.mdx`} />
              </div>
            )}
          </div>
          <DocsDescription className="text-md mt-2 mb-4">{page.data.description}</DocsDescription>
          {!!links && <ComponentLinks links={links} />}
        </section>
        <DocsBody className="prose-sm">
          <MDXContent
            components={getMDXComponents({
              ComponentCount: () => <>{getComponentCount(params.lang)}</>,
              ComponentPreview: (props) => (
                <Suspense fallback={<ComponentPreviewFallback />}>
                  <ComponentPreview {...props} locale={params.lang} />
                </Suspense>
              ),
              ComponentsCategory: (props) => <ComponentsCategory {...props} locale={params.lang} />,
              ExampleCount: () => <>{getExampleCount(params.lang)}</>,
              NativeComponentsCategory: (props) => (
                <NativeComponentsCategory {...props} locale={params.lang} />
              ),
              PRContributors: () => (
                <PRContributors contributors={contributors} github={githubInfo ?? undefined} />
              ),

              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page, LocaleLink),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{lang: string; slug?: string[]}>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);

  if (!page) notFound();

  // Read raw MDX to extract image from frontmatter
  const rawContent = await getRawMDXContent(page.path);
  const frontmatterImage = extractImageFromMDX(rawContent);

  // Determine image URL
  const image = frontmatterImage || ["/og", ...(params.slug ?? []), "image.png"].join("/");

  // Ensure absolute URL for Open Graph
  const imageUrl = image.startsWith("http") ? image : new URL(image, siteConfig.siteUrl).toString();

  // `page.url` already carries the locale prefix (`/en/docs/...`), which is the
  // URL actually served — the unprefixed `/docs/...` form permanently redirects.
  const url = page.url;
  const unlocalizedPath = stripLocale(url);
  const alternates = getLocalizedAlternates({locale: params.lang, path: unlocalizedPath});
  const seoOverride = getDocsSeoMetadata(params.lang, unlocalizedPath);
  const description = seoOverride?.description ?? page.data.description;
  const title = seoOverride?.title ?? page.data.title;

  return {
    alternates,
    description,
    openGraph: {
      description,
      images: imageUrl,
      siteName: siteConfig.name,
      title,
      url,
    },
    title: seoOverride ? {absolute: title} : title,
    twitter: {
      card: "summary_large_image",
      description,
      images: imageUrl,
      site: "@hero_ui",
      title,
    },
  };
}

export async function generateStaticParams() {
  return source
    .generateParams("slug", "lang")
    .filter((param) => param.slug && param.slug.length > 0);
}
