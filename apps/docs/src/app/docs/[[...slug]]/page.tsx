/* eslint-disable react-refresh/only-export-components */
import type {Metadata} from "next";

import {createRelativeLink} from "fumadocs-ui/mdx";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/page";
import {notFound} from "next/navigation";

import {LLMCopyButton, ViewOptions} from "@/components/ai/page-actions";
import {ComponentLinks} from "@/components/component-links";
import {siteConfig} from "@/config/site";
import {source} from "@/lib/source";
import {getMDXComponents} from "@/mdx-components";
import {extractLinksFromMDX} from "@/utils/extract-links";
// import { getGithubLastEdit } from "fumadocs-core/server";

export default async function Page(props: {params: Promise<{slug?: string[]}>}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDXContent = page.data.body;

  // TODO: add github last edit
  // const lastEditTime = await getGithubLastEdit({
  //   owner: "heroui-inc",
  //   repo: "heroui",
  //   path: `apps/docs/content/docs/${page.path}`,
  // });

  // Extract links from MDX content
  const links = extractLinksFromMDX(page.data.content);

  return (
    <DocsPage
      full={page.data.full}
      toc={page.data.toc}
      // TODO: add github last edit
      // lastUpdate={lastEditTime}
      tableOfContent={{
        style: "normal",
      }}
    >
      <section className="border-border mb-4 flex flex-col gap-2 border-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DocsTitle>{page.data.title}</DocsTitle>
          <div className="flex items-center gap-2">
            <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
            <ViewOptions
              githubUrl={`${siteConfig.links.github}/blob/dev/apps/docs/content/docs/${page.path}`}
              markdownUrl={`${page.url}.mdx`}
            />
          </div>
        </div>
        <DocsDescription className="text-md my-4">{page.data.description}</DocsDescription>
        {!!links && <ComponentLinks links={links} />}
      </section>
      <DocsBody className="prose-sm">
        <MDXContent
          components={getMDXComponents({
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

  return {
    description: page.data.description,
    title: page.data.title,
  };
}

export async function generateStaticParams() {
  return source.generateParams().filter((param) => param.slug && param.slug.length > 0);
}
