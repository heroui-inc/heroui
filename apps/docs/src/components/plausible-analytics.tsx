"use client";

import {init} from "@plausible-analytics/tracker";
import {useEffect} from "react";

/**
 * Where these docs are counted: heroui.com, with its landing (heroui-inc/heroui-pro), in HeroUI's
 * self-hosted Plausible. Other hosts (docs.heroui.com, previews, `next dev`) count nothing.
 */
const PLAUSIBLE_DOMAIN = "heroui.com";

/**
 * The query parameters Plausible reads for sources and campaigns. The rest of a URL's query never
 * leaves the browser.
 */
const SOURCE_PARAMS = new Set([
  "ref",
  "source",
  "utm_campaign",
  "utm_content",
  "utm_medium",
  "utm_source",
  "utm_term",
]);

let started = false;

/**
 * Starts Plausible's tracker once on heroui.com: pageviews (client-side navigations included),
 * outbound link clicks and file downloads, all cookieless. It sends to `/pulse` on heroui.com,
 * which the landing app answers and passes on to Plausible. Pages shown in another page's frame
 * aren't counted.
 */
export function PlausibleAnalytics() {
  useEffect(() => {
    if (started || window.location.hostname !== PLAUSIBLE_DOMAIN || window.self !== window.top) {
      return;
    }

    started = true;
    init({
      domain: PLAUSIBLE_DOMAIN,
      endpoint: "/pulse",
      fileDownloads: true,
      logging: false,
      outboundLinks: true,
      transformRequest: (payload) => ({...payload, u: withSourceParamsOnly(payload.u)}),
    });
  }, []);

  return null;
}

function withSourceParamsOnly(href: string) {
  const url = new URL(href);

  for (const key of [...url.searchParams.keys()]) {
    if (!SOURCE_PARAMS.has(key)) url.searchParams.delete(key);
  }

  return url.toString();
}
