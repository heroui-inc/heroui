import {env} from "~env";

export function isAnalyticsEnabled() {
  return (
    env.NEXT_PUBLIC_APP_ENV === "production" &&
    Boolean(env.NEXT_PUBLIC_POSTHOG_KEY) &&
    Boolean(env.NEXT_PUBLIC_POSTHOG_HOST)
  );
}
