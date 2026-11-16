"use client";

import type {PlausibleRequestPayload} from "@plausible-analytics/tracker";

import {init} from "@plausible-analytics/tracker";
import {useEffect} from "react";

/**
 * Where these docs are counted: heroui.com, with its landing (heroui-inc/heroui-pro), in HeroUI's
 * self-hosted Plausible. Other hosts (docs.heroui.com, previews, `next dev`) count nothing.
 */
const PLAUSIBLE_DOMAIN = "heroui.com";

/**
 * The query parameters Plausible reads for sources and campaigns. The rest of a URL's query and its
 * fragment never leave the browser.
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
      transformRequest: withoutPrivateUrls,
    });
  }, []);

  return null;
}

/**
 * The event with its page URL cleaned (`withoutPrivateParts`), and its referrer too when it's from
 * heroui.com. Other sites' referrers are left as they are.
 */
export function withoutPrivateUrls(payload: PlausibleRequestPayload): PlausibleRequestPayload {
  return {
    ...payload,
    r: payload.r && isSameSite(payload.r, payload.u) ? withoutPrivateParts(payload.r) : payload.r,
    u: withoutPrivateParts(payload.u),
  };
}

/** The URL with only its source parameters and no fragment. */
function withoutPrivateParts(href: string) {
  const url = new URL(href);

  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (!SOURCE_PARAMS.has(key)) url.searchParams.delete(key);
  }

  return url.toString();
}

function isSameSite(referrer: string, href: string) {
  try {
    return new URL(referrer).host === new URL(href).host;
  } catch {
    return false;
  }
}
