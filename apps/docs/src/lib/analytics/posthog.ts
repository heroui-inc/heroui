import posthog from "posthog-js";

import {env} from "~env";

import {isAnalyticsEnabled} from "./enabled";

if (typeof window !== "undefined" && isAnalyticsEnabled()) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    capture_pageleave: true,
    capture_pageview: false,
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST!.replace("i.posthog.com", "posthog.com"),
  });
}

export {posthog};
