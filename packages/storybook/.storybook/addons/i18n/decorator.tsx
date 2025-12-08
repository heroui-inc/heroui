import type {Decorator} from "@storybook/react";

import {useGlobals} from "storybook/preview-api";
import React, {useEffect} from "react";

import {DEFAULT_LOCALE, I18N_GLOBAL_TYPE_ID, LOCALES} from "./constants";

export const withInternationalization: Decorator = (Story) => {
  const [globals] = useGlobals();
  const selectedLocale = globals[I18N_GLOBAL_TYPE_ID] || DEFAULT_LOCALE;

  useEffect(() => {
    // If auto, use navigator language, otherwise use selected
    const localeValue =
      selectedLocale === "Auto"
        ? typeof navigator !== "undefined"
          ? navigator.language
          : "en-US"
        : selectedLocale;

    // Find the full locale object to get direction
    // Fallback to English/LTR if not found or if Auto resolves to something we don't have explicit config for
    // (though we mainly need direction here)
    const localeConfig =
      LOCALES.find((l) => l.value === localeValue) ||
      LOCALES.find((l) => l.value.startsWith(localeValue.split("-")[0])) ||
      LOCALES.find((l) => l.value === "en-US");

    if (localeConfig) {
      document.documentElement.lang = localeConfig.value;
      document.documentElement.dir = localeConfig.direction;
    }
  }, [selectedLocale]);

  return <Story />;
};
