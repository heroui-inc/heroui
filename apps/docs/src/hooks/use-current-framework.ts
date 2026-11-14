"use client";

import type {Root} from "fumadocs-core/page-tree";

import {flattenTree} from "fumadocs-core/page-tree";
import {usePathname} from "next/navigation";

import {i18n} from "@/lib/i18n";

export type Framework = "web" | "native";

// Default routes for each framework (without locale prefix)
export const defaultRoutes = {
  native: "/docs/native/getting-started",
  web: "/docs/react/getting-started",
} as const;

const NATIVE_DOCS_PATH = /\/docs\/native(?:\/|$)/;

export function isNativeDocsPath(pathname: string): boolean {
  return NATIVE_DOCS_PATH.test(pathname);
}

export function getLocaleFromPathname(pathname: string): (typeof i18n)["languages"][number] {
  const segment = pathname.split("/").filter(Boolean)[0];

  return i18n.languages.includes(segment as (typeof i18n)["languages"][number])
    ? (segment as (typeof i18n)["languages"][number])
    : i18n.defaultLanguage;
}

export function getDefaultRoute(framework: Framework, pathname: string): string {
  return `/${getLocaleFromPathname(pathname)}${defaultRoutes[framework]}`;
}

const FRAMEWORK_PATH_SEGMENTS = {
  native: "native",
  web: "react",
} as const satisfies Record<Framework, string>;

export function getFrameworkSwitchRoute(
  tree: Root,
  framework: Framework,
  {pathname, search = ""}: {pathname: string; search?: string},
): string {
  const defaultRoute = getDefaultRoute(framework, pathname);
  const locale = getLocaleFromPathname(pathname);
  const [localeSegment, docsSegment, platformSegment, ...rest] = pathname
    .split("/")
    .filter(Boolean);

  if (
    localeSegment !== locale ||
    docsSegment !== "docs" ||
    (platformSegment !== FRAMEWORK_PATH_SEGMENTS.web &&
      platformSegment !== FRAMEWORK_PATH_SEGMENTS.native)
  ) {
    return defaultRoute;
  }

  // Release notes are per platform, so open the other releases index.
  const segments = rest[0] === "releases" ? ["releases"] : rest;
  const basePath = `/${locale}/docs/${FRAMEWORK_PATH_SEGMENTS[framework]}`;
  const url = [basePath, ...segments].join("/");
  // Pages omitted from meta.json live in tree.fallback.
  const pageUrls = flattenTree([...tree.children, ...(tree.fallback?.children ?? [])]).map(
    (page) => page.url,
  );

  if (pageUrls.includes(url)) return `${url}${search}`;

  return findNearestSectionPage(pageUrls, basePath, segments) ?? defaultRoute;
}

// Fall back to the nearest page in the same section on the other platform.
function findNearestSectionPage(
  pageUrls: string[],
  basePath: string,
  segments: string[],
): string | undefined {
  for (let length = segments.length; length > 0; length--) {
    const prefix = [basePath, ...segments.slice(0, length)].join("/");
    const match =
      pageUrls.find((pageUrl) => pageUrl === prefix) ??
      pageUrls.find((pageUrl) => pageUrl.startsWith(`${prefix}/`));

    if (match) return match;
  }

  return undefined;
}

/**
 * Hook to detect the current framework based on the pathname
 * @returns "native" if pathname includes "/docs/native", otherwise "web"
 */
export function useCurrentFramework(): Framework {
  const pathname = usePathname();

  return isNativeDocsPath(pathname) ? "native" : "web";
}
