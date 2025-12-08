import {stat} from "node:fs/promises";
import {join} from "node:path";

import {Feed} from "feed";

import {siteConfig} from "@/config/site";
import {source} from "@/lib/source";

async function getFileLastModified(pagePath: string): Promise<Date> {
  try {
    const filePath = join(process.cwd(), "content/docs", `${pagePath}.mdx`);
    const stats = await stat(filePath);

    return stats.mtime;
  } catch {
    return new Date();
  }
}

export const getRSS = async (): Promise<string> => {
  const currentYear = new Date().getFullYear();
  const baseUrl = siteConfig.siteUrl;

  const feed = new Feed({
    copyright: `${currentYear} NextUI Inc. All rights reserved.`,
    description: siteConfig.description,
    favicon: new URL("/favicon-dark.svg", baseUrl).toString(),
    id: baseUrl.toString(),
    image: new URL(siteConfig.ogImage, baseUrl).toString(),
    language: "en-US",
    link: baseUrl.toString(),
    title: siteConfig.name,
  });

  for (const page of source.getPages()) {
    const pageUrl = new URL(page.url, baseUrl);
    const lastModified = await getFileLastModified(page.path);

    feed.addItem({
      author: [
        {
          name: siteConfig.creator,
        },
      ],
      date: lastModified,
      description: page.data.description || "HeroUI documentation page",
      id: page.url,
      link: pageUrl.toString(),
      title: page.data.title,
    });
  }

  return feed.rss2();
};
