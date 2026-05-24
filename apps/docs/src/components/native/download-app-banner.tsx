import type {FC} from "react";

import {NATIVE_APP} from "@/config/native-app";

import {HeroUILogo} from "../heroui-logo";

import {StoreButtons} from "./store-buttons";

/**
 * Full-screen "Download the App" fallback rendered at
 * `/docs/native-showcase/components/{slug}` when the visitor doesn't have
 * the HeroUI Native app installed.
 *
 * The native app's Associated Domains + `+native-intent` redirect intercept
 * matching URLs before this page is ever loaded; this component is only what
 * the user actually sees when:
 *  - they scan the QR code from a desktop browser, or
 *  - the app is not installed on their iOS/Android device.
 *
 * Server-rendered: no client hooks are used so the page is fully static and
 * shows up instantly with no client JS dependency.
 */
export const DownloadAppBanner: FC = () => {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 p-6">
      <HeroUILogo />
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Download the App</h1>
        <p className="text-sm leading-relaxed text-muted">
          {[
            "This content is available inside the ",
            NATIVE_APP.NAME,
            " app. Install it from the App Store or Google Play to preview this component live on your device.",
          ].join("")}
        </p>
      </div>
      <StoreButtons className="flex w-full max-w-xs flex-col items-stretch gap-3" size="md" />
    </main>
  );
};
