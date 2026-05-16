import {defineI18n} from "fumadocs-core/i18n";

export const i18n = defineI18n({
  defaultLanguage: "en",
  languages: ["en", "cn"],
  // content/docs/{locale}/react/...
  parser: "dir",
});
