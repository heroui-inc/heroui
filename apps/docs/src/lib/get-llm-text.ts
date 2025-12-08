import type {Page} from "@/lib/source";

import {readFile} from "node:fs/promises";
import {join} from "node:path";

import {remarkNpm} from "fumadocs-core/mdx-plugins";
import {remarkInclude} from "fumadocs-mdx/config";
import {remarkAutoTypeTable} from "fumadocs-typescript";
import {remark} from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

import {siteConfig} from "@/config/site";

const processor = remark()
  .use(remarkMdx)
  .use(remarkInclude)
  .use(remarkGfm)
  .use(remarkAutoTypeTable)
  .use(remarkNpm);

async function getRawMDXContent(pagePath: string): Promise<string> {
  try {
    const filePath = join(process.cwd(), "content/docs", `${pagePath}.mdx`);

    return await readFile(filePath, "utf-8");
  } catch {
    return "";
  }
}

export async function getLLMText(page: Page) {
  const category = page.slugs[0];

  const rawContent = await getRawMDXContent(page.path);

  const processed = await processor.process({
    path: join(process.cwd(), "content/docs", `${page.path}.mdx`),
    value: rawContent,
  });

  return `# HeroUI v3 > ${category} > ${page.data.title}
URL: ${page.url}
Source: ${siteConfig.githubRawUrl}/${page.path}

${page.data.description}

${processed.value}`;
}
