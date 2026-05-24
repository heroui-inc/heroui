import type {Page} from "@/lib/source";

import {getLLMText} from "@/lib/get-llm-text";
import {
  filterExcludedPages,
  filterPagesByPlatform,
  getPlatformFromPage,
  isComponentPage,
  validatePlatform,
} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export type AgentSearchPlatform = "react" | "native" | "all";

export type AgentSearchResult = {
  description: string;
  platform: AgentSearchPlatform;
  title: string;
  url: string;
};

export type AgentPageResult = {
  description: string;
  markdown: string;
  title: string;
  url: string;
};

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 20;

export function parseAgentSearchPlatform(value: string | null): AgentSearchPlatform {
  const platform = validatePlatform(value ?? undefined);

  return platform ?? "all";
}

export function parseAgentLimit(value: string | null): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) return DEFAULT_LIMIT;

  return Math.min(Math.max(Math.trunc(parsed), 1), MAX_LIMIT);
}

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase();
}

function pageToSearchResult(page: Page): AgentSearchResult {
  return {
    description: page.data.description ?? "",
    platform: getPlatformFromPage(page),
    title: page.data.title,
    url: page.url,
  };
}

export function searchAgentDocs(
  query: string,
  platform: AgentSearchPlatform = "all",
  limit = DEFAULT_LIMIT,
): AgentSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) return [];

  const pages = filterPagesByPlatform(filterExcludedPages(source.getPages()), platform);

  return pages
    .filter((page) => {
      const haystack = [
        page.data.title,
        page.data.description ?? "",
        page.url,
        page.slugs.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .slice(0, limit)
    .map(pageToSearchResult);
}

export function listAgentComponents(
  platform: Exclude<AgentSearchPlatform, "all"> = "react",
  limit = MAX_LIMIT,
): AgentSearchResult[] {
  return filterPagesByPlatform(filterExcludedPages(source.getPages()), platform)
    .filter(isComponentPage)
    .slice(0, limit)
    .map(pageToSearchResult);
}

export function normalizeDocsUrl(value: string): string | null {
  if (!value) return null;

  let pathname = value.trim();

  try {
    if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
      pathname = new URL(pathname).pathname;
    }
  } catch {
    return null;
  }

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  pathname = pathname.replace(/\/$/, "");

  if (!pathname.startsWith("/docs/")) return null;

  return pathname;
}

export async function getAgentDocPage(value: string): Promise<AgentPageResult | null> {
  const pathname = normalizeDocsUrl(value);

  if (!pathname) return null;

  const slug = pathname
    .replace(/^\/docs\//, "")
    .split("/")
    .filter(Boolean);
  const page = source.getPage(slug);

  if (!page) return null;

  const markdown = await getLLMText(page);

  return {
    description: page.data.description ?? "",
    markdown,
    title: page.data.title,
    url: page.url,
  };
}
