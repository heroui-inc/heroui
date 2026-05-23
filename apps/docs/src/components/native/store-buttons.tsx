"use client";

import {NATIVE_APP} from "@/config/native-app";
import {useDictionary} from "@/hooks/use-dictionary";

import {Iconify} from "../iconify";

interface StoreButtonsProps {
  /**
   * Button size variant. Controls padding and the icon's pixel size so the
   * buttons can sit either inside a small popover (`"sm"`) or as the
   * full-page CTA on the download banner (`"md"`).
   * @default "sm"
   */
  size?: "sm" | "md";
  /**
   * Additional CSS class for the wrapping `<div>`. Lets the parent control
   * width and spacing without StoreButtons baking in a max-width.
   */
  className?: string;
}

/**
 * App Store and Play Store download buttons.
 *
 * When `NATIVE_APP.PLAY_STORE_URL` is `null` (Android build not yet
 * published), the Play Store button is automatically replaced with a disabled
 * "Coming soon" placeholder that preserves layout. Setting the URL in the
 * config flips both this surface and the in-popover variant simultaneously —
 * no other code changes are required.
 */
export const StoreButtons = ({className, size = "sm"}: StoreButtonsProps) => {
  const dict = useDictionary().storeButtons;
  // The button system uses BEM modifiers — only `--sm` exists; `--md` is the
  // default and produced by omitting the modifier.
  const sizeClass = size === "sm" ? "button--sm" : "";
  const iconSize = size === "sm" ? 18 : 20;

  const appStoreLabel = dict.appStoreLabel.replace("{name}", NATIVE_APP.NAME);
  const playStoreLabel = dict.playStoreLabel.replace("{name}", NATIVE_APP.NAME);

  return (
    <div className={className ?? "flex w-full flex-col items-stretch gap-2"}>
      <a
        aria-label={appStoreLabel}
        className={["button button--primary w-full justify-center", sizeClass].join(" ")}
        href={NATIVE_APP.APP_STORE_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Iconify icon="tabler:brand-apple-filled" width={iconSize} />
        {dict.appStore}
      </a>
      {NATIVE_APP.PLAY_STORE_URL ? (
        <a
          aria-label={playStoreLabel}
          className={["button button--tertiary w-full justify-center", sizeClass].join(" ")}
          href={NATIVE_APP.PLAY_STORE_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Iconify icon="simple-icons:googleplay" width={iconSize} />
          {dict.playStore}
        </a>
      ) : (
        // `role="link"` + `aria-disabled` keeps the placeholder semantically
        // a "disabled link" rather than a button — matching how iOS surfaces
        // unavailable App Store entries.
        <span
          aria-disabled="true"
          aria-label={dict.androidComingSoonLabel}
          role="link"
          className={[
            "button button--tertiary w-full cursor-not-allowed justify-center opacity-50",
            sizeClass,
          ].join(" ")}
        >
          <Iconify icon="simple-icons:googleplay" width={iconSize} />
          {dict.androidComingSoon}
        </span>
      )}
    </div>
  );
};
