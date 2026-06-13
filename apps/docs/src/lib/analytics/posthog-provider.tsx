"use client";

import {usePathname, useSearchParams} from "next/navigation";
import {PostHogProvider as PHProvider} from "posthog-js/react";
import {Suspense, useEffect} from "react";

import {posthog} from "./posthog";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let url = window.origin + pathname;

    if (searchParams.toString()) {
      url += `?${searchParams.toString()}`;
    }

    posthog.capture("$pageview", {$current_url: url});
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({children}: {children: React.ReactNode}) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
