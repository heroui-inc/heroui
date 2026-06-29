"use client";

import {useDictionary} from "@/hooks/use-dictionary";

import {StoreButtonsView} from "./store-buttons";

interface StoreButtonsLocalizedProps {
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
 * Localized App Store / Play Store buttons for docs content.
 *
 * Reads its copy from the active `DictionaryProvider` via {@link useDictionary},
 * so it MUST be rendered inside the `[lang]` provider tree (e.g. the QR preview
 * popover and the "try on device" section). For the locale-less Universal Links
 * fallback page, use the static `StoreButtons` instead.
 */
export const StoreButtonsLocalized = ({className, size = "sm"}: StoreButtonsLocalizedProps) => {
  const labels = useDictionary().storeButtons;

  return <StoreButtonsView className={className} labels={labels} size={size} />;
};
