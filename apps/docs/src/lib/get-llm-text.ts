import type {Page} from "@/lib/source";

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

export async function getLLMText(page: Page) {
  const category = page.slugs[0];

  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  return `# HeroUI v3 > ${category} > ${page.data.title}
URL: ${page.url}
Source: ${siteConfig.githubRawUrl}/${page.path}

${page.data.description}
        
${processed.value}`;
}
