"use client";

import {Link} from "@heroui/react";
import {ReactQRCode} from "@lglab/react-qr-code";

import {NATIVE_APP} from "@/config/native-app";
import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";

import {HeroUIPlainLogo} from "../heroui-plain-logo";

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
    // Swap `https://heroui.com` for the registered custom URL scheme
    // (`herouinative://`). Tapping a Universal Link from inside Safari to the
    // same domain does NOT trigger iOS's app-handoff — Safari treats it as
    // an in-page navigation — so we fire the custom scheme directly. The
    // path part is preserved, so the native app's `+native-intent` handler
    // sees the same path regardless of entry point (Camera QR scan, in-page
    // tap, link from Notes, etc.).
    const mobileUrl = url ? url.replace(/^https?:\/\/[^/]+/, `${NATIVE_APP.SCHEME}://`) : "";

    return (
      <Link
        className="mb-4 flex w-full flex-col items-center justify-center gap-3 bg-surface-secondary/70 px-2 py-4 no-underline"
        href={mobileUrl || "#"}
      >
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-foreground text-background">
          <HeroUIPlainLogo size={18} />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="truncate text-sm font-semibold text-foreground">
            {["Open in ", NATIVE_APP.NAME].join("")}
          </span>
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
