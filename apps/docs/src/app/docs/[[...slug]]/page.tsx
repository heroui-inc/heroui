import type {StatusChipStatus} from "@/components/status-chip";
import type {Metadata} from "next";

import {readFile} from "node:fs/promises";
import {join} from "node:path";

import {createRelativeLink} from "fumadocs-ui/mdx";
import {notFound} from "next/navigation";

import {LLMCopyButton, ViewOptions} from "@/components/ai/page-actions";
import {ComponentLinks} from "@/components/component-links";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/fumadocs/layouts/notebook/page";
import {NewsletterForm} from "@/components/newsletter-form";
import {PRContributors, fetchPRContributors} from "@/components/pr-contributors";
import StatusChip from "@/components/status-chip";
import {source} from "@/lib/source";
import {getMDXComponents} from "@/mdx-components";
import {DOCS_CONTENT_PATH} from "@/utils/constants";
import {extractGithubFromMDX, extractLinksFromMDX} from "@/utils/extract-links";
// import { getGithubLastEdit } from "fumadocs-core/server";

const componentStatusIcons = ["preview", "new", "updated"];

async function getRawMDXContent(pagePath: string): Promise<string> {
  try {
    const filePath = join(process.cwd(), "content/docs", pagePath);

    return await readFile(filePath, "utf-8");
  } catch {
    return "";
  }
}

export default async function Page(props: {params: Promise<{slug?: string[]}>}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDXContent = page.data.body;
  const isComponentStatusIcon = page.data.icon && componentStatusIcons.includes(page.data.icon);

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

  return (
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
      <section className="flex flex-col gap-2 border-b border-border">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DocsTitle className="flex items-center gap-2">
            {page.data.title}
            {!!isComponentStatusIcon && (
              <StatusChip className="w-fit" status={page.data.icon as StatusChipStatus} />
            )}
          </DocsTitle>
          {page.data.toc.length > 0 && (
            <div className="flex items-center gap-2">
              <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
              <ViewOptions
                githubUrl={`${DOCS_CONTENT_PATH}/${page.path}`}
                markdownUrl={`${page.url}.mdx`}
              />
            </div>
          )}
        </div>
        <DocsDescription className="text-md mt-2 mb-4">{page.data.description}</DocsDescription>
        {!!links && <ComponentLinks links={links} />}
      </section>
      <DocsBody className="prose-sm">
        <MDXContent
          components={getMDXComponents({
            PRContributors: () => (
              <PRContributors contributors={contributors} github={githubInfo ?? undefined} />
            ),

            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: {
  params: Promise<{slug?: string[]}>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const image = ["/og", ...(params.slug ?? []), "image.png"].join("/");

  return {
    description: page.data.description,
    openGraph: {
      images: image,
    },
    title: page.data.title,
    twitter: {
      card: "summary_large_image",
      images: image,
    },
  };
}

export async function generateStaticParams() {
  return source.generateParams().filter((param) => param.slug && param.slug.length > 0);
}
