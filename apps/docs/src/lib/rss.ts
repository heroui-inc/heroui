import {stat} from "node:fs/promises";
import {join} from "node:path";

import {Feed} from "feed";

import {siteConfig} from "@/config/site";
import {getAllBlogPosts} from "@/lib/blog";
import {i18n} from "@/lib/i18n";
import {source} from "@/lib/source";

async function getFileLastModified(pagePath: string, locale: string): Promise<Date> {
  try {
    const normalizedPath = pagePath.endsWith(".mdx") ? pagePath : `${pagePath}.mdx`;
    const filePath = join(process.cwd(), "content/docs", locale, normalizedPath);
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
    copyright: `${currentYear} HeroUI Inc. All rights reserved.`,
    description: siteConfig.description,
    favicon: new URL("/favicon-dark.svg", baseUrl).toString(),
    id: baseUrl.toString(),
    image: new URL(siteConfig.ogImage, baseUrl).toString(),
    language: "en-US",
    link: baseUrl.toString(),
    title: siteConfig.fullName,
  });

  const seenBlogIds = new Set<string>();

  for (const locale of i18n.languages) {
    for (const post of getAllBlogPosts(locale)) {
      // Only emit each post once for its source locale, so fallback posts
      // are not duplicated across the feed.
      if (post.locale !== locale) continue;

      const itemId = `/${locale}/blog/${post.slug}`;

      if (seenBlogIds.has(itemId)) continue;
      seenBlogIds.add(itemId);

      const postUrl = new URL(itemId, baseUrl);

      feed.addItem({
        author: [{name: post.author}],
        date: new Date(post.date),
        description: post.description,
        id: itemId,
        link: postUrl.toString(),
        title: post.title,
      });
    }
  }

  for (const page of source.getPages()) {
    const pageUrl = new URL(page.url, baseUrl);
    const lastModified = await getFileLastModified(page.path, page.locale ?? i18n.defaultLanguage);

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
