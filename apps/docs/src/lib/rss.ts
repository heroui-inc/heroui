import {Feed} from "feed";

import {siteConfig} from "@/config/site";
import {source} from "@/lib/source";

export const getRSS = () => {
  const currentYear = new Date().getFullYear();

  const feed = new Feed({
    copyright: `${currentYear} NextUI Inc. All rights reserved.`,
    description: siteConfig.description,
    favicon: `${siteConfig.siteUrl}/favicon-dark.svg`,
    id: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}${siteConfig.ogImage}`,
    language: "en-US",
    link: siteConfig.siteUrl,
    title: siteConfig.name,
  });

  for (const page of source.getPages()) {
    feed.addItem({
      author: [
        {
          name: siteConfig.creator,
        },
      ],
      date: new Date(page.data.lastModified || Date.now()),
      description: page.data.description || "HeroUI documentation page",
      id: page.url,
      link: `${siteConfig.siteUrl}${page.url}`,
      title: page.data.title,
    });
  }

  return feed.rss2();
};
