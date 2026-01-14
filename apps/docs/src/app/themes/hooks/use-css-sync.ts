"use client";

import {useEffect} from "react";

import {THEME_BUILDER_CONTENT_ID, adaptiveColors, fontMap, radiusCssMap} from "../constants";
import {
  calculateAccentForeground,
  generateThemeColors,
  getAccentDerivedVariables,
  getColorVariablesForElement,
  getSemanticDerivedVariables,
  radiusDerivedVariables,
} from "../utils/generate-theme-colors";

import {useVariablesState} from "./use-variables-state";

/**
 * Style element ID for adaptive color CSS injection
 */
const ADAPTIVE_STYLE_ID = "theme-builder-adaptive-colors";

/**
 * Style element ID for theme-aware color CSS injection
 */
const THEME_COLORS_STYLE_ID = "theme-builder-theme-colors";

/**
 * Helper to apply a map of CSS variables to an element
 */
function applyVariables(element: HTMLElement, variables: Record<string, string>) {
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
}

/**
 * Build CSS string from a variables record
 */
function buildVarsCSS(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join("\n    ");
}

/**
 * Generates CSS for adaptive colors that need different values in light/dark modes.
 * This injects CSS rules targeting both light and dark selectors within the scoped element.
 */
function getAdaptiveColorCSS(
  accentColor: string,
  chroma: number,
  hue: number,
  lightness: number,
): string | null {
  const adaptiveConfig = adaptiveColors[accentColor];

  if (!adaptiveConfig) {
    return null;
  }

  // For adaptive colors (like black/white), we use predefined light/dark variants
  const lightFg = calculateAccentForeground(1, 0, 0); // Light accent (white) needs dark fg
  const darkFg = calculateAccentForeground(0, 0, 0); // Dark accent (black) needs light fg

  // Generate full theme colors for both modes
  const lightColors = generateThemeColors({chroma, hue, lightness});
  const darkColors = generateThemeColors({chroma, hue, lightness});

  // Get light and dark color variables
  const lightVars = getColorVariablesForElement(lightColors, "light");
  const darkVars = getColorVariablesForElement(darkColors, "dark");

  // Get derived variables for accent
  const accentDerivedLight = getAccentDerivedVariables(adaptiveConfig.light, lightFg);
  const accentDerivedDark = getAccentDerivedVariables(adaptiveConfig.dark, darkFg);

  // Get semantic derived variables
  const successDerivedLight = getSemanticDerivedVariables(
    "success",
    lightVars["--success"] ?? "",
    lightVars["--success-foreground"] ?? "",
  );
  const warningDerivedLight = getSemanticDerivedVariables(
    "warning",
    lightVars["--warning"] ?? "",
    lightVars["--warning-foreground"] ?? "",
  );
  const dangerDerivedLight = getSemanticDerivedVariables(
    "danger",
    lightVars["--danger"] ?? "",
    lightVars["--danger-foreground"] ?? "",
  );

  const successDerivedDark = getSemanticDerivedVariables(
    "success",
    darkVars["--success"] ?? "",
    darkVars["--success-foreground"] ?? "",
  );
  const warningDerivedDark = getSemanticDerivedVariables(
    "warning",
    darkVars["--warning"] ?? "",
    darkVars["--warning-foreground"] ?? "",
  );
  const dangerDerivedDark = getSemanticDerivedVariables(
    "danger",
    darkVars["--danger"] ?? "",
    darkVars["--danger-foreground"] ?? "",
  );

  const lightAccentVars = {
    "--accent": adaptiveConfig.light,
    "--accent-foreground": lightFg,
    "--focus": adaptiveConfig.light,
    ...accentDerivedLight,
  };

  const darkAccentVars = {
    "--accent": adaptiveConfig.dark,
    "--accent-foreground": darkFg,
    "--focus": adaptiveConfig.dark,
    ...accentDerivedDark,
  };

  // Merge all light vars
  const allLightVars = {
    ...lightVars,
    ...lightAccentVars,
    ...successDerivedLight,
    ...warningDerivedLight,
    ...dangerDerivedLight,
  };

  // Merge all dark vars
  const allDarkVars = {
    ...darkVars,
    ...darkAccentVars,
    ...successDerivedDark,
    ...warningDerivedDark,
    ...dangerDerivedDark,
  };

  return `
  :is([data-theme="light"], .light) #${THEME_BUILDER_CONTENT_ID},
  #${THEME_BUILDER_CONTENT_ID}:not(:is([data-theme="dark"] *, .dark *)) {
    ${buildVarsCSS(allLightVars)}
  }

  :is([data-theme="dark"], .dark) #${THEME_BUILDER_CONTENT_ID} {
    ${buildVarsCSS(allDarkVars)}
  }
  `;
}

/**
 * Generates CSS for theme-aware colors (light/dark mode support).
 * This handles all generated theme colors including semantic colors.
 */
function getThemeColorsCSS(
  chroma: number,
  hue: number,
  lightness: number,
  grayChroma: number,
): string {
  // Generate full theme colors
  const colors = generateThemeColors({chroma, grayChroma, hue, lightness});

  // Get color variables for both modes
  const lightVars = getColorVariablesForElement(colors, "light");
  const darkVars = getColorVariablesForElement(colors, "dark");

  // Get accent derived variables
  const accentLight = colors.accent.oklchLight;
  const accentFgLight = colors.accentForeground.oklchLight;
  const accentDerivedLight = getAccentDerivedVariables(accentLight, accentFgLight);

  const accentDark = colors.accent.oklchDark;
  const accentFgDark = colors.accentForeground.oklchDark;
  const accentDerivedDark = getAccentDerivedVariables(accentDark, accentFgDark);

  // Get semantic derived variables for light mode
  const successDerivedLight = getSemanticDerivedVariables(
    "success",
    lightVars["--success"] ?? "",
    lightVars["--success-foreground"] ?? "",
  );
  const warningDerivedLight = getSemanticDerivedVariables(
    "warning",
    lightVars["--warning"] ?? "",
    lightVars["--warning-foreground"] ?? "",
  );
  const dangerDerivedLight = getSemanticDerivedVariables(
    "danger",
    lightVars["--danger"] ?? "",
    lightVars["--danger-foreground"] ?? "",
  );

  // Get semantic derived variables for dark mode
  const successDerivedDark = getSemanticDerivedVariables(
    "success",
    darkVars["--success"] ?? "",
    darkVars["--success-foreground"] ?? "",
  );
  const warningDerivedDark = getSemanticDerivedVariables(
    "warning",
    darkVars["--warning"] ?? "",
    darkVars["--warning-foreground"] ?? "",
  );
  const dangerDerivedDark = getSemanticDerivedVariables(
    "danger",
    darkVars["--danger"] ?? "",
    darkVars["--danger-foreground"] ?? "",
  );

  // Default hover
  const defaultHoverLight = `color-mix(in oklab, ${lightVars["--default"]} 90%, ${lightVars["--foreground"]} 10%)`;
  const defaultHoverDark = `color-mix(in oklab, ${darkVars["--default"]} 90%, ${darkVars["--foreground"]} 10%)`;

  // Merge all light vars
  const allLightVars = {
    ...lightVars,
    ...accentDerivedLight,
    ...successDerivedLight,
    ...warningDerivedLight,
    ...dangerDerivedLight,
    "--color-default-hover": defaultHoverLight,
  };

  // Merge all dark vars
  const allDarkVars = {
    ...darkVars,
    ...accentDerivedDark,
    ...successDerivedDark,
    ...warningDerivedDark,
    ...dangerDerivedDark,
    "--color-default-hover": defaultHoverDark,
  };

  return `
  :is([data-theme="light"], .light) #${THEME_BUILDER_CONTENT_ID},
  #${THEME_BUILDER_CONTENT_ID}:not(:is([data-theme="dark"] *, .dark *)) {
    ${buildVarsCSS(allLightVars)}
  }

  :is([data-theme="dark"], .dark) #${THEME_BUILDER_CONTENT_ID} {
    ${buildVarsCSS(allDarkVars)}
  }
  `;
}

/**
 * Removes existing style elements and creates a fresh one
 */
function injectStyleElement(id: string, css: string): HTMLStyleElement {
  // Remove any existing style element with this ID
  const existingStyle = document.getElementById(id);

  if (existingStyle) {
    existingStyle.remove();
  }

  // Create and inject new style element
  const styleElement = document.createElement("style");

  styleElement.id = id;
  styleElement.textContent = css;
  document.head.appendChild(styleElement);

  return styleElement;
}

/**
 * Hook that syncs theme builder store values to CSS custom properties.
 * Should be called at the root of the theme builder page.
 *
 * This generates all theme colors based on the selected hue, chroma, and lightness,
 * applying them via CSS injection for proper light/dark mode support.
 */
export function useCssSync() {
  const [variables] = useVariablesState();
  const {base, chroma, hue, lightness} = variables;
  const accentColor = `oklch(${lightness} ${chroma} ${hue})`;

  useEffect(() => {
    const themeBuilderContent = document.getElementById(THEME_BUILDER_CONTENT_ID);

    if (!themeBuilderContent) return;

    // Check if this is an adaptive color that needs special light/dark variants
    const isAdaptive = accentColor in adaptiveColors;

    // Remove all existing injected styles
    const cleanupStyles = () => {
      [ADAPTIVE_STYLE_ID, THEME_COLORS_STYLE_ID].forEach((id) => {
        const existing = document.getElementById(id);

        if (existing) existing.remove();
      });
    };

    cleanupStyles();

    if (isAdaptive) {
      // Inject CSS for adaptive colors (different accent values for light/dark)
      const adaptiveCSS = getAdaptiveColorCSS(accentColor, chroma, hue, lightness);

      if (adaptiveCSS) {
        injectStyleElement(ADAPTIVE_STYLE_ID, adaptiveCSS);
      }
    } else {
      // Inject CSS for standard theme colors
      const themeColorsCSS = getThemeColorsCSS(chroma, hue, lightness, base);

      injectStyleElement(THEME_COLORS_STYLE_ID, themeColorsCSS);
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

    // Cleanup: remove injected styles when unmounting
    return cleanupStyles;
  }, [
    accentColor,
    chroma,
    hue,
    lightness,
    variables.fontFamily,
    variables.formRadius,
    variables.radius,
    base,
  ]);
}
