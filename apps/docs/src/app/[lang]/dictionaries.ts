import "server-only";

import {headers} from "next/headers";

import {i18n} from "@/lib/i18n";

const dictionaries = {
  cn: () => import("./dictionaries/cn.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

function getFirstPathSegment(pathOrUrl: string): string | undefined {
  try {
    const pathname = pathOrUrl.startsWith("/") ? pathOrUrl : new URL(pathOrUrl).pathname;

    return pathname.split("/").filter(Boolean)[0];
  } catch {
    return undefined;
  }
}

/**
 * Resolves locale for error boundaries (e.g. not-found) that do not receive route params.
 * Checks request URL headers first, then referer, then falls back to the default locale.
 */
export async function getRequestLocale(): Promise<Locale> {
  const headersList = await headers();
  const candidates = [
    headersList.get("x-url"),
    headersList.get("next-url"),
    headersList.get("x-invoke-path"),
    headersList.get("referer"),
  ];

  for (const value of candidates) {
    if (!value) continue;

    const segment = getFirstPathSegment(value);

    if (segment && hasLocale(segment)) return segment;
  }

  return i18n.defaultLanguage as Locale;
}
