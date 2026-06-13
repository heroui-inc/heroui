"use client";

import type {ReactNode} from "react";

import {usePathname, useSearchParams} from "next/navigation";
import {PostHogProvider as PHProvider} from "posthog-js/react";
import {Suspense, useEffect} from "react";

import {isAnalyticsEnabled} from "./enabled";
import {posthog} from "./posthog";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    let url = window.origin + pathname;

    if (search) {
      url += `?${search}`;
    }

    posthog.capture("$pageview", {$current_url: url});
  }, [pathname, search]);

  return null;
}

export function PostHogProvider({children}: {children: ReactNode}) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
