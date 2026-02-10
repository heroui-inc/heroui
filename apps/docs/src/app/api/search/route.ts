import {createSearchAPI} from "fumadocs-core/search/server";

import {source} from "@/lib/source";

export const {GET} = createSearchAPI("advanced", {
  indexes: source.getPages().map((page) => ({
    description: page.data.description,
    id: page.url,
    structuredData: page.data.structuredData,
    tag: page.url.startsWith("/docs/react/") ? "web" : "native",
    title: page.data.title,
    url: page.url,
  })),
  language: "english",
});
