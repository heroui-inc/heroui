import {defineI18nUI} from "fumadocs-ui/i18n";

import {i18n} from "@/lib/i18n";

export const i18nUI = defineI18nUI(i18n, {
  translations: {
    cn: {
      displayName: "简体中文",
      search: "搜索文档",
    },
    en: {
      displayName: "English",
    },
  },
});
