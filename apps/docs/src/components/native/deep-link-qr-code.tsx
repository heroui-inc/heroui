"use client";

import {Link} from "@heroui/react";
import {ReactQRCode} from "@lglab/react-qr-code";

import {NATIVE_APP} from "@/config/native-app";
import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";

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
  // Strip protocol from the display URL for a cleaner mobile card —
  // `heroui.com/docs/...` reads much better than the full `https://...`.
  const displayUrl = url.replace(/^https?:\/\//, "");

  if (isMobile) {
    return (
      <Link
        className="flex w-full items-center gap-3 rounded-xl border border-foreground/20 p-3 px-4"
        href={url || "#"}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <span className="text-sm font-semibold text-foreground">
            {["Open in ", NATIVE_APP.NAME].join("")}
          </span>
          <span className="truncate text-xs text-muted/75">{displayUrl || "Loading..."}</span>
        </div>
        <Link.Icon />
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
