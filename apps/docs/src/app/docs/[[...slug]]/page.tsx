import {createRelativeLink} from "fumadocs-ui/mdx";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/page";
import {notFound} from "next/navigation";

import {LLMCopyButton, ViewOptions} from "@/components/ai/page-actions";
import {siteConfig} from "@/config/site";
import {source} from "@/lib/source";
import {getMDXComponents} from "@/mdx-components";
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
        <div className="flex items-center justify-between">
          <DocsTitle>{page.data.title}</DocsTitle>
          <div className="flex items-center gap-2">
            <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
            <ViewOptions
              githubUrl={`${siteConfig.links.github}/blob/dev/apps/docs/content/docs/${page.path}`}
              markdownUrl={`${page.url}.mdx`}
            />
          </div>
        </div>
        <DocsDescription className="mb-4">{page.data.description}</DocsDescription>
      </section>
      <DocsBody>
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

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {params: Promise<{slug?: string[]}>}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  return {
    description: page.data.description,
    title: page.data.title,
  };
}
