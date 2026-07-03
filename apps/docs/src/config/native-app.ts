/**
 * Centralised configuration for the HeroUI Native mobile app surfaces in the
 * docs site. Used by:
 *  - the QR popover that appears next to every component preview
 *  - the "Try on Device" MDX section in release notes
 *  - the "Download the App" web fallback rendered when a user opens a
 *    Universal Link without the native app installed
 *
 * Centralising these values keeps every entry point in sync — when the Android
 * build is ready we only flip one constant here instead of hunting through
 * components and MDX pages.
 */
export const NATIVE_APP = {
  /**
   * App Store listing for the HeroUI Native iOS app. Always defined because
   * iOS is the canonical Universal-Links target and the App Store badge is
   * always shown in the download UI.
   */
  APP_STORE_URL: "https://apps.apple.com/app/id6757860059",
  /**
   * Human-readable product name used in copy ("Open in HeroUI Native",
   * "Download HeroUI Native on the App Store", etc.). Kept here so it tracks
   * any future rebranding from a single source of truth.
   */
  NAME: "HeroUI Native",
  /**
   * Set to `null` while the Android build isn't published yet. Both the QR
   * popover and the DownloadAppBanner render a disabled "Coming soon" state
   * automatically when this is `null`. When the Play Store listing goes live,
   * paste its URL here and both surfaces re-enable with no other code changes.
   */
  PLAY_STORE_URL: "https://play.google.com/store/apps/details?id=com.herouinative.android",
  /**
   * Custom URL scheme registered by the native app. Used by the in-page
   * "Open in app" tap link on mobile to bypass iOS's same-domain Safari
   * limitation (Universal Links don't fire when tapping a link to the same
   * domain you're already on in Safari — see
   * https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
   * The scheme path mirrors the Universal Link path so the native app's
   * `+native-intent` handler can route both transparently.
   */
  SCHEME: "herouinative",
  /**
   * URL path prefix used by the docs app to serve the web fallback for
   * `/docs/native-showcase/components/{slug}` Universal Links. The same prefix
   * is encoded into the QR code on every component page so that:
   *  - On-device, the AASA glob (`/docs/native-showcase/components/*`)
   *    redirects the link into the installed HeroUI Native app.
   *  - Off-device (or when the app isn't installed), the browser falls back
   *    to the route handler at `apps/docs/src/app/native-showcase/...`.
   */
  SHOWCASE_PATH_PREFIX: "/docs/native-showcase/components",
} as const satisfies {
  APP_STORE_URL: string;
  NAME: string;
  PLAY_STORE_URL: string | null;
  SCHEME: string;
  SHOWCASE_PATH_PREFIX: string;
};

/**
 * Type alias for the immutable native-app config object. Useful when threading
 * config through helpers that need to accept any future replacement of this
 * object shape.
 */
export type NativeAppConfig = typeof NATIVE_APP;
