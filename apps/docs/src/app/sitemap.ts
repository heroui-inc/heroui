import type {MetadataRoute} from "next";

import {getAllBlogPosts, getBlogPost} from "@/lib/blog";
import {filterExcludedPages} from "@/lib/llms-utils";
import {LOCALES, absoluteUrl, getSitemapAlternates, localizedPath, stripLocale} from "@/lib/seo";
import {source} from "@/lib/source";
import {getAllShowcases} from "@/showcases";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Locale-agnostic paths mapped to the locales they are published in. Docs pages
 * come from the Fumadocs loader (they are rendered dynamically, so they are
 * invisible to any sitemap generator that only reads the prerender manifest).
 */
type LocalizedPaths = Map<string, {locales: string[]; lastModified?: Date}>;

function addPath(paths: LocalizedPaths, path: string, locale: string, lastModified?: Date): void {
  const existing = paths.get(path);

  if (!existing) {
    paths.set(path, {lastModified, locales: [locale]});

    return;
  }

  if (!existing.locales.includes(locale)) existing.locales.push(locale);
  if (lastModified && (!existing.lastModified || lastModified > existing.lastModified)) {
    existing.lastModified = lastModified;
  }
}

function toEntries(paths: LocalizedPaths, defaultLastModified: Date): SitemapEntry[] {
  return [...paths].flatMap(([path, {lastModified, locales}]) =>
    locales.map((locale) => ({
      alternates: {languages: getSitemapAlternates(path, locales)},
      lastModified: lastModified ?? defaultLastModified,
      url: absoluteUrl(localizedPath(locale, path)),
    })),
  );
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date();
  const paths: LocalizedPaths = new Map();

  for (const locale of LOCALES) {
    addPath(paths, "/", locale);
    addPath(paths, "/blog", locale);
    addPath(paths, "/showcase", locale);
    addPath(paths, "/themes", locale);

    for (const page of filterExcludedPages(source.getPages(locale))) {
      addPath(paths, stripLocale(page.url), locale);
    }

    for (const post of getAllBlogPosts(locale)) {
      if (getBlogPost(post.slug, locale)?.locale !== locale) continue;

      addPath(paths, `/blog/${post.slug}`, locale, parseDate(post.date));
    }

    for (const showcase of getAllShowcases()) {
      addPath(paths, `/showcase/${showcase.name}`, locale);
    }
  }

  const localizedEntries = toEntries(paths, generatedAt);

  // Keep one canonical entry per URL. Machine-readable `.mdx`/`llms` routes
  // and the unprefixed native-showcase fallback are intentionally excluded.
  return [...new Map(localizedEntries.map((entry) => [entry.url, entry])).values()];
}
