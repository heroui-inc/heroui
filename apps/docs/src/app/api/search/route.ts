import {createI18nSearchAPI} from "fumadocs-core/search/server";

import {i18n} from "@/lib/i18n";
import {source} from "@/lib/source";

export const {GET} = createI18nSearchAPI("advanced", {
  i18n,
  indexes: source.getLanguages().flatMap(({language, pages}) =>
    pages.map((page) => ({
      description: page.data.description,
      id: page.url,
      locale: language,
      structuredData: page.data.structuredData,
      // The framework lives in the first slug segment after the locale,
      // e.g. `content/docs/<locale>/react/...` -> slugs[0] === "react".
      tag: page.slugs[0] === "react" ? "web" : "native",
      title: page.data.title,
      url: page.url,
    })),
  ),
  // `cn` is not a built-in Orama language; fall back to the English tokenizer
  // so Chinese pages can still be indexed (latin terms still match).
  localeMap: {
    cn: "english",
    en: "english",
  },
});
