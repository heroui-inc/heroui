import {siteConfig} from "@/config/site";
import {i18n} from "@/lib/i18n";

export interface LocalizedAlternates {
  canonical: string;
  languages: Record<string, string>;
}

/**
 * `hreflang` values must be BCP 47 language tags. The content directories use
 * `cn` for Simplified Chinese, which is a region subtag rather than a language,
 * so it has to be translated before it reaches the markup.
 */
const LANGUAGE_TAG_BY_LOCALE: Record<string, string> = {
  cn: "zh-Hans",
  en: "en",
};

export const DEFAULT_LOCALE = i18n.defaultLanguage;
export const LOCALES: readonly string[] = i18n.languages;

const LOCALE_PREFIX_PATTERN = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`);

export function normalizeLocale(locale: string | undefined): string {
  return locale && LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

export function getLanguageTag(locale: string | undefined): string {
  return LANGUAGE_TAG_BY_LOCALE[normalizeLocale(locale)] ?? LANGUAGE_TAG_BY_LOCALE[DEFAULT_LOCALE]!;
}

/** Turns `/en/docs/react/button` into the locale-agnostic `/docs/react/button`. */
export function stripLocale(path: string): string {
  return path.replace(LOCALE_PREFIX_PATTERN, "") || "/";
}

/**
 * Resolves the URL actually served for `path` in `locale`.
 *
 * The default-locale home page is served at `/` — `/en` only exists as the
 * internal rewrite target of `proxy.ts`, so it must never be advertised as a
 * canonical URL. Every other route keeps its locale prefix because unprefixed
 * paths redirect (`/docs/...` -> `/en/docs/...`).
 */
export function localizedPath(locale: string, path = "/"): string {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  if (!normalizedPath && normalizeLocale(locale) === DEFAULT_LOCALE) return "/";

  return `/${normalizeLocale(locale)}${normalizedPath}`;
}

export function absoluteUrl(path: string): string {
  const url = new URL(path, siteConfig.siteUrl);

  return url.pathname === "/" && !url.search && !url.hash ? url.origin : url.toString();
}

/**
 * Builds `<link rel="canonical">` plus the `hreflang` cluster for a document
 * that exists in `locales`, from its locale-agnostic `path`.
 *
 * When the requested `locale` has no translation of its own, the route still
 * renders (fallback content), so it points at the default locale instead of
 * self-canonicalising untranslated duplicates.
 */
export function getLocalizedAlternates({
  locale,
  locales = LOCALES,
  path = "/",
}: {
  locale: string;
  locales?: readonly string[];
  path?: string;
}): LocalizedAlternates {
  const languages: Record<string, string> = {};

  for (const candidate of locales) {
    const hreflang = LANGUAGE_TAG_BY_LOCALE[candidate];

    if (!hreflang) continue;

    languages[hreflang] = localizedPath(candidate, path);
  }

  if (locales.includes(DEFAULT_LOCALE)) {
    languages["x-default"] = localizedPath(DEFAULT_LOCALE, path);
  }

  const canonicalLocale = locales.includes(normalizeLocale(locale))
    ? normalizeLocale(locale)
    : DEFAULT_LOCALE;

  return {
    canonical: localizedPath(canonicalLocale, path),
    languages,
  };
}

/** Same as `getLocalizedAlternates`, but with absolute URLs for `sitemap.xml`. */
export function getSitemapAlternates(
  path: string,
  locales: readonly string[] = LOCALES,
): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const candidate of locales) {
    const hreflang = LANGUAGE_TAG_BY_LOCALE[candidate];

    if (!hreflang) continue;

    languages[hreflang] = absoluteUrl(localizedPath(candidate, path));
  }

  if (locales.includes(DEFAULT_LOCALE)) {
    languages["x-default"] = absoluteUrl(localizedPath(DEFAULT_LOCALE, path));
  }

  return languages;
}
