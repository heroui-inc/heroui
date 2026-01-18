"use client";

import {useEffect} from "react";

import {
  THEME_BUILDER_BOTTOM_SHEET_ID,
  THEME_BUILDER_CONTENT_ID,
  THEME_BUILDER_PAGE_ID,
  adaptiveColors,
  fontMap,
  radiusCssMap,
} from "../constants";
import {getCustomFontInfoFromUrl, injectFontLink, isCustomFontUrl} from "../utils/font-utils";
import {
  calculateAccentForeground,
  generateThemeColors,
  getAccentDerivedVariables,
  getColorVariablesForElement,
  getFieldDerivedVariables,
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
 * CSS selector for colors only (page level)
 */
const PAGE_SELECTORS = `#${THEME_BUILDER_PAGE_ID}`;

/**
 * CSS selector for full theme (colors + radius + fonts)
 * Targets the content area and dialogs within it
 */
const CONTENT_SELECTORS = [
  `#${THEME_BUILDER_BOTTOM_SHEET_ID}`,
  `#${THEME_BUILDER_CONTENT_ID}`,
  `#${THEME_BUILDER_CONTENT_ID} [role='dialog']`,
].join(", ");

/**
 * Build CSS string from a variables record
 */
function buildVarsCSS(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join("\n    ");
}

/**
 * Get common variables (radius, font) that apply to both light and dark modes
 */
function getCommonVariables(
  radius: string,
  fieldRadius: string,
  fontVariable: string,
): Record<string, string> {
  return {
    "--field-radius": fieldRadius,
    "--font-sans": `var(${fontVariable})`,
    "--radius": radius,
    ...radiusDerivedVariables,
  };
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
  commonVars: Record<string, string>,
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

  // Get field derived variables
  const fieldDerivedLight = getFieldDerivedVariables(
    lightVars["--field-background"] ?? "",
    lightVars["--field-foreground"] ?? "",
    lightVars["--field-placeholder"] ?? "",
    lightVars["--border"] ?? "",
  );
  const fieldDerivedDark = getFieldDerivedVariables(
    darkVars["--field-background"] ?? "",
    darkVars["--field-foreground"] ?? "",
    darkVars["--field-placeholder"] ?? "",
    darkVars["--border"] ?? "",
  );

  // Colors only (for page level)
  const colorLightVars = {
    ...lightVars,
    ...lightAccentVars,
    ...successDerivedLight,
    ...warningDerivedLight,
    ...dangerDerivedLight,
    ...fieldDerivedLight,
  };

  const colorDarkVars = {
    ...darkVars,
    ...darkAccentVars,
    ...successDerivedDark,
    ...warningDerivedDark,
    ...dangerDerivedDark,
    ...fieldDerivedDark,
  };

  // Full theme vars (colors + radius + fonts for content level)
  const fullLightVars = {...commonVars, ...colorLightVars};
  const fullDarkVars = {...commonVars, ...colorDarkVars};

  return `
  /* Page level: colors only */
  :is([data-theme="light"], .light) ${PAGE_SELECTORS},
  ${PAGE_SELECTORS}:not(:is([data-theme="dark"] *, .dark *)) {
    ${buildVarsCSS(colorLightVars)}
  }

  :is([data-theme="dark"], .dark) ${PAGE_SELECTORS} {
    ${buildVarsCSS(colorDarkVars)}
  }

  /* Content level: colors + radius + fonts */
  :is([data-theme="light"], .light) :is(${CONTENT_SELECTORS}),
  :is(${CONTENT_SELECTORS}):not(:is([data-theme="dark"] *, .dark *)) {
    ${buildVarsCSS(fullLightVars)}
  }

  :is([data-theme="dark"], .dark) :is(${CONTENT_SELECTORS}) {
    ${buildVarsCSS(fullDarkVars)}
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
  commonVars: Record<string, string>,
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

  // Get field derived variables
  const fieldDerivedLight = getFieldDerivedVariables(
    lightVars["--field-background"] ?? "",
    lightVars["--field-foreground"] ?? "",
    lightVars["--field-placeholder"] ?? "",
    lightVars["--border"] ?? "",
  );
  const fieldDerivedDark = getFieldDerivedVariables(
    darkVars["--field-background"] ?? "",
    darkVars["--field-foreground"] ?? "",
    darkVars["--field-placeholder"] ?? "",
    darkVars["--border"] ?? "",
  );

  // Colors only (for page level)
  const colorLightVars = {
    ...lightVars,
    ...accentDerivedLight,
    ...successDerivedLight,
    ...warningDerivedLight,
    ...dangerDerivedLight,
    ...fieldDerivedLight,
    "--color-default-hover": defaultHoverLight,
  };

  const colorDarkVars = {
    ...darkVars,
    ...accentDerivedDark,
    ...successDerivedDark,
    ...warningDerivedDark,
    ...dangerDerivedDark,
    ...fieldDerivedDark,
    "--color-default-hover": defaultHoverDark,
  };

  // Full theme vars (colors + radius + fonts for content level)
  const fullLightVars = {...commonVars, ...colorLightVars};
  const fullDarkVars = {...commonVars, ...colorDarkVars};

  return `
  /* Page level: colors only */
  :is([data-theme="light"], .light) ${PAGE_SELECTORS},
  ${PAGE_SELECTORS}:not(:is([data-theme="dark"] *, .dark *)) {
    ${buildVarsCSS(colorLightVars)}
  }

  :is([data-theme="dark"], .dark) ${PAGE_SELECTORS} {
    ${buildVarsCSS(colorDarkVars)}
  }

  /* Content level: colors + radius + fonts */
  :is([data-theme="light"], .light) :is(${CONTENT_SELECTORS}),
  :is(${CONTENT_SELECTORS}):not(:is([data-theme="dark"] *, .dark *)) {
    ${buildVarsCSS(fullLightVars)}
  }

  :is([data-theme="dark"], .dark) :is(${CONTENT_SELECTORS}) {
    ${buildVarsCSS(fullDarkVars)}
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
 * Style element ID for font CSS variable definition
 */
const FONT_VAR_STYLE_ID = "theme-builder-font-var";

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
    // Check if this is an adaptive color that needs special light/dark variants
    const isAdaptive = accentColor in adaptiveColors;

    // Determine font variable - handle predefined fonts and URL-based custom fonts
    // All fonts are now loaded on-demand via CDN
    const fontFamily = variables.fontFamily;
    let fontVariable: string;
    let fontFamilyName: string;

    if (isCustomFontUrl(fontFamily)) {
      // Custom font via URL - extract info and inject
      const customFontInfo = getCustomFontInfoFromUrl(fontFamily);

      if (customFontInfo) {
        // Inject the font stylesheet from CDN
        injectFontLink(customFontInfo.variable, fontFamily);
        fontVariable = customFontInfo.variable;
        fontFamilyName = customFontInfo.fontFamily;
      } else {
        // Fallback to Inter if we can't parse the URL
        const interFont = fontMap.inter;

        injectFontLink(interFont.variable, interFont.cdnUrl);
        fontVariable = interFont.variable;
        fontFamilyName = interFont.label;
      }
    } else {
      // Predefined font by ID - load on-demand via CDN
      const predefinedFont = fontMap[fontFamily as keyof typeof fontMap] ?? fontMap.inter;

      // Inject the font stylesheet from CDN
      injectFontLink(predefinedFont.variable, predefinedFont.cdnUrl);
      fontVariable = predefinedFont.variable;
      fontFamilyName = predefinedFont.label;
    }

    // Build common variables (radius, font) that apply to all selectors
    const commonVars = getCommonVariables(
      radiusCssMap[variables.radius],
      radiusCssMap[variables.formRadius],
      fontVariable,
    );

    // Inject the CSS variable definition for the font
    // All fonts (predefined and custom) are loaded via CDN and need their variable defined
    const fontVarCSS = `:root { ${fontVariable}: "${fontFamilyName}", sans-serif; }`;

    injectStyleElement(FONT_VAR_STYLE_ID, fontVarCSS);

    // Remove all existing injected color styles
    const cleanupStyles = () => {
      [ADAPTIVE_STYLE_ID, THEME_COLORS_STYLE_ID].forEach((id) => {
        const existing = document.getElementById(id);

        if (existing) existing.remove();
      });
    };

    cleanupStyles();

    if (isAdaptive) {
      // Inject CSS for adaptive colors (different accent values for light/dark)
      const adaptiveCSS = getAdaptiveColorCSS(accentColor, chroma, hue, lightness, commonVars);

      if (adaptiveCSS) {
        injectStyleElement(ADAPTIVE_STYLE_ID, adaptiveCSS);
      }
    } else {
      // Inject CSS for standard theme colors
      const themeColorsCSS = getThemeColorsCSS(chroma, hue, lightness, base, commonVars);

      injectStyleElement(THEME_COLORS_STYLE_ID, themeColorsCSS);
    }

    // Cleanup: remove injected styles when unmounting
    return () => {
      cleanupStyles();
      // Also remove font var style on unmount
      const existingFontVar = document.getElementById(FONT_VAR_STYLE_ID);

      if (existingFontVar) {
        existingFontVar.remove();
      }
    };
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
