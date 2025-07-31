import type {Decorator} from "@storybook/react";

import {useGlobals} from "@storybook/preview-api";
import React, {useEffect} from "react";

import {DEFAULT_THEME, THEME_GLOBAL_TYPE_ID} from "./constants";

export const withTheme: Decorator = (Story, context) => {
  const [globals] = useGlobals();
  const selectedTheme = globals[THEME_GLOBAL_TYPE_ID] || DEFAULT_THEME;

  useEffect(() => {
    const root = document.documentElement;

    // Remove any existing theme
    root.removeAttribute("data-theme");

    // Apply new theme
    if (selectedTheme !== "system") {
      root.setAttribute("data-theme", selectedTheme);
    }

    // For system theme, check user preference
    if (selectedTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (prefersDark) {
        root.setAttribute("data-theme", "dark");
      }
    }
  }, [selectedTheme]);

  return <Story {...context} />;
};
