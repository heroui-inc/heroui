"use client";

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

/**
 * Hook to detect the current framework based on the pathname
 * @returns "native" if pathname includes "/docs/native", otherwise "web"
 */
export function useCurrentFramework(): Framework {
  const pathname = usePathname();

  return isNativeDocsPath(pathname) ? "native" : "web";
}
