import {defineI18nUI} from "fumadocs-ui/i18n";

import {i18n} from "@/lib/i18n";

export const i18nUI = defineI18nUI(i18n, {
  translations: {
    cn: {
      displayName: "Chinese",
      search: "搜尋文檔",
    },
    en: {
      displayName: "English",
    },
  },
});
