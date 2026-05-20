import type {ThemeVariables} from "../constants";
import type {GeneratedThemeColors, SemanticOverrides, ThemeColor} from "./generate-theme-colors";

import {
  adaptiveColors,
  findMatchingTheme,
  fontMap,
  radiusCssMap,
  themeValuesById,
} from "../constants";

/**
 * Custom font info for generating CSS variables
 */
export interface CustomFontInfo {
  label: string;
  variable: string;
  fontFamily: string;
}

import {calculateAccentForeground, generateThemeColors, parseOklch} from "./generate-theme-colors";

/**
 * Get only the authored CSS variables that users need to customize.
 * Derived variables are provided by the default theme stylesheet.
 */
function getBaseColorVariables(
  colors: GeneratedThemeColors,
  theme: "light" | "dark",
): Record<string, string> {
  const isLight = theme === "light";
  const getValue = (color: ThemeColor) => (isLight ? color.oklchLight : color.oklchDark);

  return {
    "--accent": getValue(colors.accent),
    "--accent-foreground": getValue(colors.accentForeground),
    "--background": getValue(colors.background),
    "--border": getValue(colors.border),
    "--danger": getValue(colors.danger),
    "--danger-foreground": getValue(colors.dangerForeground),
    "--default": getValue(colors.default),
    "--default-foreground": getValue(colors.defaultForeground),
    "--field-background": getValue(colors.fieldBackground),
    "--field-border": "transparent",
    "--field-foreground": getValue(colors.fieldForeground),
    "--field-placeholder": getValue(colors.fieldPlaceholder),
    "--focus": getValue(colors.focus),
    "--foreground": getValue(colors.foreground),
    "--muted": getValue(colors.muted),
    "--overlay": getValue(colors.overlay),
    "--overlay-foreground": getValue(colors.overlayForeground),
    "--scrollbar": getValue(colors.scrollbar),
    "--segment": getValue(colors.segment),
    "--segment-foreground": getValue(colors.segmentForeground),
    "--separator": getValue(colors.separator),
    "--success": getValue(colors.success),
    "--success-foreground": getValue(colors.successForeground),
    "--surface": getValue(colors.surface),
    "--surface-foreground": getValue(colors.surfaceForeground),
    "--surface-secondary": getValue(colors.surfaceSecondary),
    "--surface-secondary-foreground": getValue(colors.surfaceSecondaryForeground),
    "--surface-tertiary": getValue(colors.surfaceTertiary),
    "--surface-tertiary-foreground": getValue(colors.surfaceTertiaryForeground),
    "--warning": getValue(colors.warning),
    "--warning-foreground": getValue(colors.warningForeground),
  };
}

/**
 * Generates CSS output with only the variables users need to customize.
 * Derived variables are automatically computed by the default theme stylesheet.
 *
 * @param variables - Theme variables from the builder
 * @param customFont - Optional custom font info when using a CDN font
 */
export function generateMinimalCssVariables(
  variables: ThemeVariables,
  customFont?: CustomFontInfo,
): string {
  // Check if this is a predefined font
  const fontId = variables.fontFamily;
  const isPredefinedFont = fontId in fontMap;
  const predefinedFont = isPredefinedFont ? fontMap[fontId as keyof typeof fontMap] : undefined;

  const {base, chroma, hue, lightness} = variables;
  const accentColor = `oklch(${lightness} ${chroma} ${hue})`;
  const adaptiveConfig = adaptiveColors[accentColor];

  // Find matching theme to get semantic overrides
  const matchingThemeId = findMatchingTheme(variables);
  const semanticOverrides: SemanticOverrides | undefined = matchingThemeId
    ? themeValuesById[matchingThemeId].semanticOverrides
    : undefined;

  // Generate theme colors
  const colors = generateThemeColors({chroma, grayChroma: base, hue, lightness, semanticOverrides});

  // Get base variables for both themes
  const lightVars = getBaseColorVariables(colors, "light");
  const darkVars = getBaseColorVariables(colors, "dark");

  // Override accent for adaptive colors (like black/white)
  if (adaptiveConfig) {
    const lightAccent = parseOklch(adaptiveConfig.light);
    const darkAccent = parseOklch(adaptiveConfig.dark);

    const lightFg = lightAccent
      ? calculateAccentForeground(lightAccent.l, lightAccent.c, lightAccent.h)
      : calculateAccentForeground(0, 0, 0);
    const darkFg = darkAccent
      ? calculateAccentForeground(darkAccent.l, darkAccent.c, darkAccent.h)
      : calculateAccentForeground(1, 0, 0);

    lightVars["--accent"] = adaptiveConfig.light;
    lightVars["--accent-foreground"] = lightFg;
    lightVars["--accent-soft-foreground"] = adaptiveConfig.light;
    lightVars["--focus"] = adaptiveConfig.light;

    darkVars["--accent"] = adaptiveConfig.dark;
    darkVars["--accent-foreground"] = darkFg;
    darkVars["--accent-soft-foreground"] = adaptiveConfig.dark;
    darkVars["--focus"] = adaptiveConfig.dark;
  }

  // Build CSS strings
  const lightVarsCSS = Object.entries(lightVars)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join("\n");

  const darkVarsCSS = Object.entries(darkVars)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join("\n");

  // Determine font values based on whether it's predefined or custom
  let fontLabel: string;
  let fontSansValue: string;

  if (predefinedFont) {
    fontLabel = predefinedFont.label;
    fontSansValue = `var(${predefinedFont.variable})`;
  } else if (customFont) {
    fontLabel = customFont.label;
    fontSansValue = `"${customFont.fontFamily}", sans-serif`;
  } else {
    // Fallback for unknown font
    fontLabel = "your custom font";
    fontSansValue = "var(--font-sans)";
  }

  const vibrantComment = variables.vibrantPalette
    ? `
/*
 * Vibrant Palette: Add data-vibrant-palette="true" to your <html> element
 * for more saturated soft foreground colors (less accessible contrast).
 * Example: <html data-vibrant-palette="true">
 */
`
    : "";

  return `/*
 * HeroUI Theme Customization
 * Add this to your global.css after importing @heroui/styles
 * Only includes variables users need to customize
 * @see https://heroui.com/docs/react/getting-started/theming
 */
${vibrantComment}
:root,
.light,
.default,
[data-theme="light"],
[data-theme="default"] {
  /* Theme Colors (Light Mode) */
${lightVarsCSS}

  /* Border Radius */
  --radius: ${radiusCssMap[variables.radius]};
  --field-radius: ${radiusCssMap[variables.formRadius]};

  /* Font Family */
  /* Make sure to load ${fontLabel} font in your app */
  --font-sans: ${fontSansValue};
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
  /* Theme Colors (Dark Mode) */
${darkVarsCSS}
}`;
}
