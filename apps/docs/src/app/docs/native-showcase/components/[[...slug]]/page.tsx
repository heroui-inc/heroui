import type {Metadata} from "next";
import type {FC} from "react";

import {DownloadAppBanner} from "@/components/native";
import {NATIVE_APP} from "@/config/native-app";

/**
 * Render the same static fallback shell for every component slug. Next.js
 * will produce a single static HTML response that gets served for any unknown
 * slug under `/docs/native-showcase/components/*`.
 */
export const dynamic = "force-static";

/**
 * Allow Next.js to render this route for slugs that weren't pre-rendered at
 * build time. The page intentionally doesn't render slug-specific content -
 * it's a generic "Download the app" banner - so accepting any slug at runtime
 * is the desired behaviour.
 */
export const dynamicParams = true;

/**
 * Metadata for the web fallback. We mark the page `noindex` because the URL
 * exists exclusively to serve Universal Links and is never meant to surface in
 * search results. The description and title are still set so the page renders
 * cleanly when shared (e.g. in a chat preview) before the native app picks
 * the link up.
 */
export const metadata: Metadata = {
  description: [
    "Open this component in the ",
    NATIVE_APP.NAME,
    " app, or download the app from the App Store or Google Play.",
  ].join(""),
  robots: {follow: false, index: false},
  title: [`Open in ${NATIVE_APP.NAME}`, "HeroUI"].join(" | "),
};

/**
 * Web fallback rendered when a user navigates to
 * `/docs/native-showcase/components/{slug}` without the HeroUI Native app
 * installed (e.g. they scan the QR from a non-iOS/Android device, or iOS
 * decides not to deep-link because the AASA glob didn't match).
 *
 * The native app's `+native-intent` redirect transforms matching URLs into
 * in-app routes - so when the app IS installed, this page is never actually
 * displayed, the OS intercepts the URL before the browser ever loads it.
 */
const NativeShowcaseComponentsFallbackPage: FC = () => {
  return <DownloadAppBanner />;
};

export default NativeShowcaseComponentsFallbackPage;
