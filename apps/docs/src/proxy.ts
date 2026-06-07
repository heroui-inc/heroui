import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";

import {getHomepageLinkHeader} from "@/lib/agent-discovery";
import {acceptsMarkdown} from "@/lib/agent-markdown";
import {i18n} from "@/lib/i18n";

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

// Routes that live outside `app/[lang]` and must never receive a locale prefix.
const LOCALE_REDIRECT_EXCLUDED_PREFIXES = [
  ...MARKDOWN_EXCLUDED_PREFIXES,
  "/install",
  "/native",
  "/react",
  "/docs/native-showcase",
];

const SUPPORTED_LOCALES = new Set<string>(i18n.languages);
const DEFAULT_LOCALE = i18n.defaultLanguage;

function isHomepage(pathname: string): boolean {
  return pathname === "/";
}

function getLocaleFromPath(pathname: string): string | undefined {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  return firstSegment && SUPPORTED_LOCALES.has(firstSegment) ? firstSegment : undefined;
}

function shouldSkipLocaleRedirect(pathname: string): boolean {
  if (MARKDOWN_EXCLUDED_PATHS.has(pathname)) return true;
  if (LOCALE_REDIRECT_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  if (pathname.startsWith("/llms")) return true;
  // Files with extensions (e.g. .mdx) are handled by next.config.ts rewrites.
  if (PUBLIC_FILE_PATTERN.test(pathname)) return true;

  return false;
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

  // Markdown handler runs first so agent requests are served regardless of locale.
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

  // Routes under `app/[lang]` require a locale prefix. When none is provided:
  //   - the homepage (`/`) is internally rewritten to the default locale so the
  //     visible URL stays clean.
  //   - all other localized paths (e.g. `/docs/...`, `/blog/...`, `/themes`) are
  //     redirected to include the default locale prefix.
  if (!getLocaleFromPath(pathname) && !shouldSkipLocaleRedirect(pathname)) {
    const url = request.nextUrl.clone();

    if (pathname === "/") {
      url.pathname = `/${DEFAULT_LOCALE}`;

      return addHomepageDiscoveryHeaders(NextResponse.rewrite(url), pathname);
    }

    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;

    return NextResponse.redirect(url);
  }

  return addHomepageDiscoveryHeaders(NextResponse.next(), pathname);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  // You may need to adjust it to ignore static assets in `/public` folder
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
