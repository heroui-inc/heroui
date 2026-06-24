"use client";

import {useState} from "react";

import {NATIVE_APP} from "@/config/native-app";

import {DeepLinkQRCode} from "./deep-link-qr-code";
import {StoreButtonsLocalized} from "./store-buttons-localized";

/**
 * Read `window.location.origin` synchronously when running in the browser.
 * Returns the empty string on the server so the first render produces a
 * deterministic markup that hydrates cleanly once React picks up the client
 * state. We avoid `useEffect` + `setState` to sidestep the cascading-render
 * warning emitted by `react-hooks/set-state-in-effect`.
 */
function readOrigin(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.origin;
}

/**
 * TryOnDevice
 *
 * Drop-in MDX section for release notes pages. Renders a QR code (desktop) or
 * a tap-to-open link (mobile) that deep-links into the HeroUI Native app's
 * home screen via Universal Links.
 *
 * Below the QR code, App Store and Play Store buttons are shown so users
 * without the app installed can grab it directly from the same surface.
 *
 * `NATIVE_APP.SHOWCASE_PATH_PREFIX` + `/` (trailing slash) is the canonical
 * "home" target — it matches Apple's AASA paths glob
 * (`/docs/native-showcase/components/*`) and is recognised by the native
 * app's `+native-intent` redirect as the app-root entrypoint.
 */
export const TryOnDevice = () => {
  // Lazy initializer reads `window.location.origin` once during mount on the
  // client; on the server it returns "" so the markup is identical between
  // SSR and the first client render (no hydration warning).
  const [origin] = useState<string>(readOrigin);

  const deepLinkUrl = origin ? `${origin}${NATIVE_APP.SHOWCASE_PATH_PREFIX}/` : "";

  return (
    <div className="not-prose my-8 w-full overflow-hidden rounded-xl border border-separator">
      <div className="flex flex-col items-center gap-6 px-6 py-10">
        <DeepLinkQRCode size={200} url={deepLinkUrl} />
        <span className="mb-2 text-center text-xs text-foreground">
          {["Don't have the ", NATIVE_APP.NAME, " app yet? Download it below."].join("")}
        </span>
        <StoreButtonsLocalized className="flex w-full max-w-xs flex-col items-stretch gap-2" />
      </div>
    </div>
  );
};
