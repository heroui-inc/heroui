import {PostHog} from "posthog-node";

import {env} from "~env";

export const getPostHogClient = () => {
  if (!env.NEXT_PUBLIC_POSTHOG_KEY) {
    return null;
  }

  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    flushAt: 1,
    flushInterval: 0,
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
  });

  return posthogClient;
};

export const captureEvent = async (eventMessage: Omit<EventMessage, "distinctId">) => {
  const posthog = getPostHogClient();

  if (!posthog || env.NEXT_PUBLIC_APP_ENV !== "production") {
    return;
  }

  posthog.capture({
    distinctId: "unknown",
    ...eventMessage,
  });

  await posthog.shutdown();
};

type EventMessage = Parameters<PostHog["capture"]>[0];
