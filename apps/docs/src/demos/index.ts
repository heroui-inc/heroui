import type {ComponentType} from "react";

import {demos as cnDemos} from "./cn";
import {demos as enDemos} from "./en";

export type Lang = "en" | "cn";

export const DEFAULT_LANG: Lang = "en";

export interface DemoItem {
  loader: () => Promise<ComponentType>;
  /**
   * Source file path relative to `src/demos`, used by `ComponentSource` to
   * load the raw code from disk. Always lang-prefixed, e.g.
   * `en/accordion/basic.tsx` or `cn/accordion/basic.tsx`.
   */
  file: string;
}

const registries: Record<Lang, Record<string, DemoItem>> = {
  cn: cnDemos,
  en: enDemos,
};

function isLang(value: string | undefined): value is Lang {
  return value === "en" || value === "cn";
}

function resolveLang(lang?: string): Lang {
  return isLang(lang) ? lang : DEFAULT_LANG;
}

/**
 * Look up a demo by registry key. If a translation does not exist for the
 * requested `lang`, falls back to the {@link DEFAULT_LANG} registry so we can
 * translate demos incrementally without breaking pages.
 */
export function getDemo(name: string, lang?: string): DemoItem | undefined {
  const resolved = resolveLang(lang);

  return registries[resolved]?.[name] ?? registries[DEFAULT_LANG][name];
}

/** Number of unique components covered by demos in `lang`. */
export function getComponentCount(lang?: string): number {
  const resolved = resolveLang(lang);
  const uniqueComponents = new Set(
    Object.values(registries[resolved]).map((demo) => demo.file.match(/^[^/]+\/([^/]+)\//)?.[1]),
  );

  return uniqueComponents.size;
}

/** Total number of demo examples registered for `lang`. */
export function getExampleCount(lang?: string): number {
  const resolved = resolveLang(lang);

  return Object.keys(registries[resolved]).length;
}
