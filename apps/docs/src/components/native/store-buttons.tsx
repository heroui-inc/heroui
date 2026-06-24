import type {Dictionary} from "@/lib/dictionaries";

import {NATIVE_APP} from "@/config/native-app";

import {Iconify} from "../iconify";

/**
 * Shape of the localized strings consumed by the store buttons. Mirrors the
 * `storeButtons` slice of the docs dictionary so the localized and static
 * variants share a single, type-safe contract.
 */
export type StoreButtonsLabels = Dictionary["storeButtons"];

/**
 * English fallback strings used by the static {@link StoreButtons} variant,
 * which renders on the locale-less Universal Links page at
 * `/docs/native-showcase/components/{slug}` where no `DictionaryProvider` is
 * mounted.
 */
const DEFAULT_STORE_BUTTONS: StoreButtonsLabels = {
  androidComingSoon: "Android · Coming soon",
  androidComingSoonLabel: "Android version coming soon",
  appStore: "Download on App Store",
  appStoreLabel: "Download {name} on the App Store",
  playStore: "Download on Play Store",
  playStoreLabel: "Download {name} on Google Play",
};

interface StoreButtonsViewProps {
  /**
   * Localized strings to render. Supplied by the static variant (English
   * defaults) or the localized variant (dictionary-backed).
   */
  labels: StoreButtonsLabels;
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
 * Presentational App Store / Play Store buttons.
 *
 * This component holds the shared markup for both the static and localized
 * variants and receives its copy via the `labels` prop. It has no hooks, so it
 * renders in both server and client contexts.
 *
 * When `NATIVE_APP.PLAY_STORE_URL` is `null` (Android build not yet
 * published), the Play Store button is automatically replaced with a disabled
 * "Coming soon" placeholder that preserves layout. Setting the URL in the
 * config flips both this surface and the in-popover variant simultaneously —
 * no other code changes are required.
 */
export const StoreButtonsView = ({className, labels, size = "sm"}: StoreButtonsViewProps) => {
  // The button system uses BEM modifiers — only `--sm` exists; `--md` is the
  // default and produced by omitting the modifier.
  const sizeClass = size === "sm" ? "button--sm" : "";
  const iconSize = size === "sm" ? 18 : 20;

  const appStoreLabel = labels.appStoreLabel.replace("{name}", NATIVE_APP.NAME);
  const playStoreLabel = labels.playStoreLabel.replace("{name}", NATIVE_APP.NAME);

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
        {labels.appStore}
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
          {labels.playStore}
        </a>
      ) : (
        // `role="link"` + `aria-disabled` keeps the placeholder semantically
        // a "disabled link" rather than a button — matching how iOS surfaces
        // unavailable App Store entries.
        <span
          aria-disabled="true"
          aria-label={labels.androidComingSoonLabel}
          role="link"
          className={[
            "button button--tertiary w-full cursor-not-allowed justify-center opacity-50",
            sizeClass,
          ].join(" ")}
        >
          <Iconify icon="simple-icons:googleplay" width={iconSize} />
          {labels.androidComingSoon}
        </span>
      )}
    </div>
  );
};

interface StoreButtonsProps {
  /**
   * Button size variant. @see StoreButtonsViewProps.size
   * @default "sm"
   */
  size?: "sm" | "md";
  /**
   * Additional CSS class for the wrapping `<div>`.
   * @see StoreButtonsViewProps.className
   */
  className?: string;
}

/**
 * Static, English-only store buttons for the locale-less Universal Links
 * fallback page (`/docs/native-showcase/components/{slug}`).
 *
 * This variant has no client hooks and does NOT depend on a
 * `DictionaryProvider`, so the surrounding page renders fully statically. For
 * localized docs content, use `StoreButtonsLocalized` instead.
 */
export const StoreButtons = ({className, size = "sm"}: StoreButtonsProps) => (
  <StoreButtonsView className={className} labels={DEFAULT_STORE_BUTTONS} size={size} />
);
