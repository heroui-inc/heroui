"use client";

import {useEffect} from "react";

import {useThemeBuilder} from "@/stores/theme-builder";

// Map radius option IDs to CSS rem values
const radiusMap: Record<string, string> = {
  "extra-large": "1rem",
  "extra-small": "0.125rem",
  large: "0.75rem",
  medium: "0.5rem",
  none: "0",
  small: "0.25rem",
};

// Map font IDs to their CSS variable names
const fontVariableMap: Record<string, string> = {
  "dm-sans": "--font-dm-sans",
  figtree: "--font-figtree",
  geist: "--font-geist",
  "google-sans": "--font-google-sans",
  "hanken-grotesk": "--font-hanken-grotesk",
  inter: "--font-inter",
  "public-sans": "--font-public-sans",
};

/**
 * Hook that syncs theme builder store values to CSS custom properties.
 * Should be called at the root of the theme builder page.
 */
export function useThemeVariables() {
  const variables = useThemeBuilder((state) => state.variables);

  useEffect(() => {
    // const root = document.documentElement;
    const themeBuilderContent = document.getElementById("theme-builder-content");

    // Update --accent with the selected color
    themeBuilderContent?.style.setProperty("--accent", variables.accentColor);

    // Update --radius
    const radiusValue = radiusMap[variables.radius] ?? "0.5rem";

    themeBuilderContent?.style.setProperty("--radius", radiusValue);

    // Update --field-radius
    const fieldRadiusValue = radiusMap[variables.formRadius] ?? "0.5rem";

    themeBuilderContent?.style.setProperty("--field-radius", fieldRadiusValue);

    // Update --font-sans with the selected font variable
    const fontVariable = fontVariableMap[variables.fontFamily] ?? "--font-inter";

    themeBuilderContent?.style.setProperty("--font-sans", `var(${fontVariable})`);
  }, [variables.accentColor, variables.fontFamily, variables.formRadius, variables.radius]);
}
