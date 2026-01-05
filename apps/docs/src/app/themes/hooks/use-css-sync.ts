"use client";

import {useEffect} from "react";

import {fontMap, radiusCssMap} from "../constants";

import {useVariablesState} from "./use-variables-state";

/**
 * Accent-derived variables that need to be recalculated at the scoped level.
 * These mirror the calculations from @heroui/styles theme.css
 */
const accentDerivedVariables: Record<string, string> = {
  "--color-accent": "var(--accent)",
  "--color-accent-foreground": "var(--accent-foreground)",
  "--color-accent-hover":
    "color-mix(in oklab, var(--color-accent) 90%, var(--color-accent-foreground) 10%)",
  "--color-accent-soft": "color-mix(in oklab, var(--color-accent) 15%, transparent)",
  "--color-accent-soft-foreground": "var(--color-accent)",
  "--color-accent-soft-hover": "color-mix(in oklab, var(--color-accent) 20%, transparent)",
  "--color-focus": "var(--focus)",
  "--tw-ring-color": "var(--focus)",
};

/**
 * Radius-derived variables that need to be recalculated at the scoped level.
 * These mirror the calculations from @heroui/styles theme.css
 */
const radiusDerivedVariables: Record<string, string> = {
  "--radius-2xl": "calc(var(--radius) * 2)",
  "--radius-3xl": "calc(var(--radius) * 3)",
  "--radius-4xl": "calc(var(--radius) * 4)",
  "--radius-field": "var(--field-radius, var(--radius-xl))",
  "--radius-lg": "calc(var(--radius) * 1)",
  "--radius-md": "calc(var(--radius) * 0.75)",
  "--radius-sm": "calc(var(--radius) * 0.5)",
  "--radius-xl": "calc(var(--radius) * 1.5)",
  "--radius-xs": "calc(var(--radius) * 0.25)",
};

/**
 * Helper to apply a map of CSS variables to an element
 */
function applyVariables(element: HTMLElement, variables: Record<string, string>) {
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
}

/**
 * Hook that syncs theme builder store values to CSS custom properties.
 * Should be called at the root of the theme builder page.
 *
 * Since @theme inline variables are computed at :root level, we need to
 * re-apply the derived variable formulas at the scoped element level
 * so the browser recalculates them using our overridden base values.
 */
export function useCssSync() {
  const [variables] = useVariablesState();

  useEffect(() => {
    const themeBuilderContent = document.getElementById("theme-builder-content");
    // const themeBuilderContent = document.documentElement;

    if (!themeBuilderContent) return;

    // Set base accent color and re-apply all accent-derived variables
    themeBuilderContent.style.setProperty("--accent", variables.accentColor);
    themeBuilderContent.style.setProperty("--focus", variables.accentColor);
    applyVariables(themeBuilderContent, accentDerivedVariables);

    // Set base radius and re-apply all radius-derived variables
    themeBuilderContent.style.setProperty("--radius", radiusCssMap[variables.radius]);
    applyVariables(themeBuilderContent, radiusDerivedVariables);

    // Set field radius (used by --radius-field)
    themeBuilderContent.style.setProperty("--field-radius", radiusCssMap[variables.formRadius]);

    // Update --font-sans with the selected font variable
    themeBuilderContent.style.setProperty(
      "--font-sans",
      `var(${fontMap[variables.fontFamily].variable})`,
    );
  }, [variables.accentColor, variables.fontFamily, variables.formRadius, variables.radius]);
}
