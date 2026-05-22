import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";

import {getHomepageLinkHeader} from "@/lib/agent-discovery";
import {acceptsMarkdown} from "@/lib/agent-markdown";

const MARKDOWN_EXCLUDED_PREFIXES = [
  "/agent-markdown",
  "/_next",
  "/api",
  "/.well-known",
  "/assets",
  "/fonts",
  "/icons",
  "/images",
  "/og",
  "/skills",
];

const MARKDOWN_EXCLUDED_PATHS = new Set([
  "/browserconfig.xml",
  "/favicon.ico",
  "/manifest.webmanifest",
  "/robots.txt",
  "/rss.xml",
  "/sitemap.xml",
]);

const PUBLIC_FILE_PATTERN = /\.[a-z0-9]+$/i;

function isHomepage(pathname: string): boolean {
  return pathname === "/";
}

function shouldSkipMarkdownRewrite(pathname: string): boolean {
  if (MARKDOWN_EXCLUDED_PATHS.has(pathname)) return true;
  if (MARKDOWN_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  if (pathname.startsWith("/llms")) return true;
  if (/^\/(react|native)\/llms/.test(pathname)) return true;

  return PUBLIC_FILE_PATTERN.test(pathname) && !pathname.startsWith("/docs/");
}

function addHomepageDiscoveryHeaders(response: NextResponse, pathname: string): NextResponse {
  if (isHomepage(pathname)) {
    response.headers.set("Link", getHomepageLinkHeader());
  }

  return response;
}

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (
    (request.method === "GET" || request.method === "HEAD") &&
    !shouldSkipMarkdownRewrite(pathname) &&
    acceptsMarkdown(request)
  ) {
    const url = request.nextUrl.clone();

    url.pathname = "/agent-markdown";
    url.search = "";
    url.searchParams.set("path", pathname);

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-heroui-markdown-path", pathname);

    return addHomepageDiscoveryHeaders(
      NextResponse.rewrite(url, {
        request: {
          headers: requestHeaders,
        },
      }),
      pathname,
    );
  }

  return addHomepageDiscoveryHeaders(NextResponse.next(), pathname);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
