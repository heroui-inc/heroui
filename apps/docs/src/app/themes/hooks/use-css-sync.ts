"use client";

import {useEffect} from "react";

import {THEME_BUILDER_CONTENT_ID, adaptiveColors, fontMap, radiusCssMap} from "../constants";
import {calculateForeground} from "../utils/calculate-foreground";

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
 * Style element ID for adaptive color CSS injection
 */
const ADAPTIVE_STYLE_ID = "theme-builder-adaptive-colors";

/**
 * Generates CSS for adaptive colors that need different values in light/dark modes.
 * This injects CSS rules targeting both light and dark selectors within the scoped element.
 */
function getAdaptiveColorCSS(
  accentColor: string,
  derivedVariables: Record<string, string>,
): string | null {
  const adaptiveConfig = adaptiveColors[accentColor];

  if (!adaptiveConfig) {
    return null;
  }

  const lightFg = calculateForeground(adaptiveConfig.light);
  const darkFg = calculateForeground(adaptiveConfig.dark);

  const derivedVarsCSS = Object.entries(derivedVariables)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join("\n    ");

  return `
  :is([data-theme="light"], .light) #${THEME_BUILDER_CONTENT_ID},
  #${THEME_BUILDER_CONTENT_ID}:not(:is([data-theme="dark"] *, .dark *)) {
    --accent: ${adaptiveConfig.light};
    --focus: ${adaptiveConfig.light};
    --accent-foreground: ${lightFg};
    ${derivedVarsCSS}
  }

  :is([data-theme="dark"], .dark) #${THEME_BUILDER_CONTENT_ID} {
    --accent: ${adaptiveConfig.dark};
    --focus: ${adaptiveConfig.dark};
    --accent-foreground: ${darkFg};
    ${derivedVarsCSS}
  }
  `;
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
    const themeBuilderContent = document.getElementById(THEME_BUILDER_CONTENT_ID);
    // const themeBuilderContent = document.documentElement;

    if (!themeBuilderContent) return;

    // Check if this is an adaptive color that needs light/dark variants
    const adaptiveCSS = getAdaptiveColorCSS(variables.accentColor, accentDerivedVariables);

    // Remove any existing adaptive style element
    const existingStyle = document.getElementById(ADAPTIVE_STYLE_ID);

    if (existingStyle) {
      existingStyle.remove();
    }

    if (adaptiveCSS) {
      // Inject CSS for adaptive colors (different values for light/dark)
      const styleElement = document.createElement("style");

      styleElement.id = ADAPTIVE_STYLE_ID;
      styleElement.textContent = adaptiveCSS;
      document.head.appendChild(styleElement);

      // Clear inline styles for accent to let the injected CSS take over
      themeBuilderContent.style.removeProperty("--accent");
      themeBuilderContent.style.removeProperty("--focus");
      themeBuilderContent.style.removeProperty("--accent-foreground");
    } else {
      // Non-adaptive color: set directly on element
      themeBuilderContent.style.setProperty("--accent", variables.accentColor);
      themeBuilderContent.style.setProperty("--focus", variables.accentColor);
      const foreground = calculateForeground(variables.accentColor);

      themeBuilderContent.style.setProperty("--accent-foreground", foreground);
      applyVariables(themeBuilderContent, accentDerivedVariables);
    }

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

    // Cleanup: remove injected style when unmounting or color changes to non-adaptive
    return () => {
      const styleToRemove = document.getElementById(ADAPTIVE_STYLE_ID);

      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [variables.accentColor, variables.fontFamily, variables.formRadius, variables.radius]);
}
