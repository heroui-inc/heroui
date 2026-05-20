"use client";

import {Link} from "@heroui/react";
import {ReactQRCode} from "@lglab/react-qr-code";

import {NATIVE_APP} from "@/config/native-app";
import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";

import {HeroUIPlainLogo} from "../heroui-plain-logo";

/**
 * In-app route segment that hosts component screens. This matches the
 * `app/components/[slug].tsx` Expo Router file in the native app — it is part
 * of the deep-linking contract between the docs site and the native app.
 *
 * The native app's `+native-intent.ts` only rewrites `https:` URLs (those
 * coming via Universal Links / App Links). For our custom-scheme URLs it
 * returns the path unchanged and Expo Router routes it natively, which means
 * the URL must already encode the in-app route — i.e.
 * `herouinative://components/{slug}` becomes `/components/{slug}` and
 * `herouinative://` opens the initial route.
 */
const IN_APP_COMPONENT_PATH = "components";

/**
 * Convert the canonical Universal Link URL into the matching custom-scheme
 * URL that Expo Router can navigate without going through `+native-intent`.
 *
 * Examples:
 *  - `https://heroui.com/docs/native-showcase/components/button` ->
 *    `herouinative://components/button`
 *  - `https://heroui.com/docs/native-showcase/components/`       ->
 *    `herouinative://`  (open at the app's initial route)
 *  - `""` (origin not yet resolved on the client) -> `""`
 */
function toCustomSchemeUrl(universalLinkUrl: string): string {
  if (!universalLinkUrl) return "";

  const prefixIdx = universalLinkUrl.indexOf(NATIVE_APP.SHOWCASE_PATH_PREFIX);

  if (prefixIdx === -1) return `${NATIVE_APP.SCHEME}://`;

  const remainder = universalLinkUrl.slice(prefixIdx + NATIVE_APP.SHOWCASE_PATH_PREFIX.length);
  const slug = remainder.replace(/^\//, "").split("/")[0] ?? "";

  return slug
    ? `${NATIVE_APP.SCHEME}://${IN_APP_COMPONENT_PATH}/${slug}`
    : `${NATIVE_APP.SCHEME}://`;
}

interface DeepLinkQRCodeProps {
  /**
   * The Universal Link URL to encode into the QR code (desktop) or display as
   * a tap-to-open link (mobile). When empty, both renderings collapse to a
   * harmless placeholder so the component can render before the client-side
   * `window.location.origin` resolves (avoids hydration mismatches).
   */
  url: string;
  /**
   * QR code edge length, in CSS pixels. The container is always sized to a
   * perfect square so the QR has consistent surroundings regardless of
   * `level`/error-correction settings.
   * @default 160
   */
  size?: number;
}

/**
 * Render a styled QR code on desktop or a tap-to-open link card on mobile.
 *
 * This primitive is shared between the popover (small, inside a dialog) and
 * the full-width "Try on Device" section (large, embedded in MDX). It owns
 * the desktop/mobile branching so call sites don't have to repeat
 * `useIsMobileDevice()` checks.
 */
export const DeepLinkQRCode = ({size = 160, url}: DeepLinkQRCodeProps) => {
  const isMobile = useIsMobileDevice();

  if (isMobile) {
    // Tapping a Universal Link from inside Safari to the same domain does NOT
    // trigger iOS's app handoff — Safari treats it as an in-page navigation.
    // So on mobile we fire the custom URL scheme directly, encoded in the
    // shape Expo Router's deep-link handler expects:
    // `herouinative://components/{slug}` (or `herouinative://` for home).
    // The native app's `+native-intent.ts` deliberately only rewrites
    // `https:` URLs and returns custom-scheme paths unchanged, so the URL
    // itself must already be in the in-app route format.
    const mobileUrl = toCustomSchemeUrl(url);

    return (
      <Link
        className="mt-1 mb-3 flex w-full flex-col items-center justify-center gap-3 border border-dashed border-border px-2 py-4 no-underline"
        href={mobileUrl || "#"}
      >
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-foreground text-background">
          <HeroUIPlainLogo size={18} />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="truncate text-sm font-semibold text-foreground">{NATIVE_APP.NAME}</span>
          <span className="truncate text-xs text-muted">Tap to launch the app</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-center" style={{height: size, width: size}}>
      {!!url && (
        <ReactQRCode
          background="transparent"
          level="M"
          size={size}
          value={url}
          dataModulesSettings={{
            color: "var(--foreground)",
            randomSize: true,
            style: "circle",
          }}
          finderPatternInnerSettings={{
            color: "var(--foreground)",
            style: "square",
          }}
          finderPatternOuterSettings={{
            color: "var(--foreground)",
            style: "rounded",
          }}
        />
      )}
    </div>
  );
};
