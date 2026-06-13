import posthog from "posthog-js";

import {env} from "~env";

const key = typeof window !== "undefined" ? env.NEXT_PUBLIC_POSTHOG_KEY : undefined;

if (
  typeof window !== "undefined" &&
  env.NEXT_PUBLIC_APP_ENV === "production" &&
  key &&
  env.NEXT_PUBLIC_POSTHOG_HOST
) {
  posthog.init(key, {
    api_host: "/ingest",
    capture_pageleave: true,
    capture_pageview: false,
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST.replace("i.posthog.com", "posthog.com"),
  });
}

export {posthog};
