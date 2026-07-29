import {absoluteUrl} from "@/lib/seo";

export const revalidate = false;

/**
 * Content Signals (https://contentsignals.org) is not expressible through
 * Next.js' `MetadataRoute.Robots` type, so `robots.txt` is served as a route
 * instead of a static file. Keeping it in the app means the `Sitemap` line can
 * never drift from the deployed canonical host.
 */
const CONTENT_SIGNAL = "Content-Signal: ai-train=yes, search=yes, ai-input=yes";

export const GET = () => {
  const body = [
    "# Every crawlable route is open to every crawler. Non-indexable endpoints",
    "# (preview deployments, machine-only routes) opt out via X-Robots-Tag or",
    "# page metadata instead, so nothing indexable is ever blocked here.",
    "User-agent: *",
    "Allow: /",
    CONTENT_SIGNAL,
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
