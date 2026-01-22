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

import {
  calculateAccentForeground,
  generateThemeColors,
  getAccentDerivedVariables,
  getColorVariablesForElement,
  getFieldDerivedVariables,
  getSemanticDerivedVariables,
} from "./generate-theme-colors";

/**
 * Get only the base CSS variables (those defined in variables.css)
 * Excludes derived variables like --color-accent-hover, --color-accent-soft, etc.
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
    "--warning": getValue(colors.warning),
    "--warning-foreground": getValue(colors.warningForeground),
  };
}

/**
 * Build CSS variable declarations for a given theme
 */
function buildColorVarsCSS(
  colors: GeneratedThemeColors,
  theme: "light" | "dark",
  indentation = "  ",
): string {
  const vars = getColorVariablesForElement(colors, theme);

  // Get accent derived variables
  const accentValue = theme === "light" ? colors.accent.oklchLight : colors.accent.oklchDark;
  const accentFgValue =
    theme === "light" ? colors.accentForeground.oklchLight : colors.accentForeground.oklchDark;
  const accentDerived = getAccentDerivedVariables(accentValue, accentFgValue);

  // Get semantic derived variables
  const successDerived = getSemanticDerivedVariables(
    "success",
    vars["--success"] ?? "",
    vars["--success-foreground"] ?? "",
  );
  const warningDerived = getSemanticDerivedVariables(
    "warning",
    vars["--warning"] ?? "",
    vars["--warning-foreground"] ?? "",
  );
  const dangerDerived = getSemanticDerivedVariables(
    "danger",
    vars["--danger"] ?? "",
    vars["--danger-foreground"] ?? "",
  );

  // Default hover
  const defaultHover = `color-mix(in oklab, ${vars["--default"]} 90%, ${vars["--foreground"]} 10%)`;

  // Get field derived variables
  const fieldDerived = getFieldDerivedVariables(
    vars["--field-background"] ?? "",
    vars["--field-foreground"] ?? "",
    vars["--field-placeholder"] ?? "",
    vars["--border"] ?? "",
  );

  // Merge all vars
  const allVars = {
    ...vars,
    ...accentDerived,
    ...successDerived,
    ...warningDerived,
    ...dangerDerived,
    ...fieldDerived,
    "--color-default-hover": defaultHover,
  };

  return Object.entries(allVars)
    .map(([prop, val]) => `${indentation}${prop}: ${val};`)
    .join("\n");
}

/**
 * Generates CSS variables that users can copy-paste into their global.css.
 * Generates comprehensive theme colors based on hue, chroma, and lightness.
 *
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 * @param customFont - Optional custom font info when using a CDN font
 */
export function generateCssVariables(
  variables: ThemeVariables,
  customFont?: CustomFontInfo,
): string {
  // Check if this is a predefined font
  const fontId = variables.fontFamily;
  const isPredefinedFont = fontId in fontMap;
  const predefinedFont = isPredefinedFont ? fontMap[fontId as keyof typeof fontMap] : undefined;

  const {chroma, hue, lightness} = variables;
  const accentColor = `oklch(${lightness} ${chroma} ${hue})`;
  const adaptiveConfig = adaptiveColors[accentColor];

  // Find matching theme to get semantic overrides
  const matchingThemeId = findMatchingTheme(variables);
  const semanticOverrides: SemanticOverrides | undefined = matchingThemeId
    ? themeValuesById[matchingThemeId].semanticOverrides
    : undefined;

  // Generate theme colors
  const colors = generateThemeColors({chroma, hue, lightness, semanticOverrides});

  // Build radius CSS
  const radiusCSS = `
  /* Border Radius */
  --radius: ${radiusCssMap[variables.radius]};
  --field-radius: ${radiusCssMap[variables.formRadius]};`;

  // Determine font values
  let fontLabel: string;
  let fontSansValue: string;

  if (predefinedFont) {
    fontLabel = predefinedFont.label;
    fontSansValue = `var(${predefinedFont.variable})`;
  } else if (customFont) {
    fontLabel = customFont.label;
    fontSansValue = `"${customFont.fontFamily}", sans-serif`;
  } else {
    fontLabel = "your custom font";
    fontSansValue = "var(--font-sans)";
  }

  // Build font CSS
  const fontCSS = `
  /* Font Family */
  /* Make sure to load ${fontLabel} font in your app */
  --font-sans: ${fontSansValue};`;

  // Check if this is an adaptive color that needs light/dark variants
  if (adaptiveConfig) {
    const lightFg = calculateAccentForeground(1, 0, 0); // Light accent needs dark fg
    const darkFg = calculateAccentForeground(0, 0, 0); // Dark accent needs light fg

    // For adaptive colors, we override the accent with predefined values
    const lightVars = getColorVariablesForElement(colors, "light");
    const darkVars = getColorVariablesForElement(colors, "dark");

    // Get accent derived for both modes
    const accentDerivedLight = getAccentDerivedVariables(adaptiveConfig.light, lightFg);
    const accentDerivedDark = getAccentDerivedVariables(adaptiveConfig.dark, darkFg);

    // Get semantic derived for both modes
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

    // Default hover
    const defaultHoverLight = `color-mix(in oklab, ${lightVars["--default"]} 90%, ${lightVars["--foreground"]} 10%)`;
    const defaultHoverDark = `color-mix(in oklab, ${darkVars["--default"]} 90%, ${darkVars["--foreground"]} 10%)`;

    // Get field derived for both modes
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

    // Build light mode vars string
    const lightAccentVars = {
      "--accent": adaptiveConfig.light,
      "--accent-foreground": lightFg,
      "--focus": adaptiveConfig.light,
    };
    const allLightVars = {
      ...lightVars,
      ...lightAccentVars,
      ...accentDerivedLight,
      ...successDerivedLight,
      ...warningDerivedLight,
      ...dangerDerivedLight,
      ...fieldDerivedLight,
      "--color-default-hover": defaultHoverLight,
    };
    const lightVarsCSS = Object.entries(allLightVars)
      .map(([prop, val]) => `  ${prop}: ${val};`)
      .join("\n");

    // Build dark mode vars string
    const darkAccentVars = {
      "--accent": adaptiveConfig.dark,
      "--accent-foreground": darkFg,
      "--focus": adaptiveConfig.dark,
    };
    const allDarkVars = {
      ...darkVars,
      ...darkAccentVars,
      ...accentDerivedDark,
      ...successDerivedDark,
      ...warningDerivedDark,
      ...dangerDerivedDark,
      ...fieldDerivedDark,
      "--color-default-hover": defaultHoverDark,
    };
    const darkVarsCSS = Object.entries(allDarkVars)
      .map(([prop, val]) => `  ${prop}: ${val};`)
      .join("\n");

    return `/*
 * HeroUI Theme Customization
 * Add this to your global.css after importing @heroui/styles
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */

:root,
.light,
.default,
[data-theme="light"],
[data-theme="default"] {
  /* Theme Colors (Light Mode) */
${lightVarsCSS}
${radiusCSS}
${fontCSS}
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
  /* Theme Colors (Dark Mode) */
${darkVarsCSS}
}`;
  }

  // Non-adaptive color: generate complete theme
  const lightVarsCSS = buildColorVarsCSS(colors, "light");
  const darkVarsCSS = buildColorVarsCSS(colors, "dark");

  return `/*
 * HeroUI Theme Customization
 * Add this to your global.css after importing @heroui/styles
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */

:root,
.light,
.default,
[data-theme="light"],
[data-theme="default"] {
  /* Theme Colors (Light Mode) */
${lightVarsCSS}
${radiusCSS}
${fontCSS}
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
  /* Theme Colors (Dark Mode) */
${darkVarsCSS}
}`;
}

/**
 * Generates CSS output with only the base variables found in variables.css.
 * Does not include derived variables like --color-accent-hover, --color-accent-soft, etc.
 * These derived variables are automatically computed by theme.css.
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
    const lightFg = calculateAccentForeground(1, 0, 0);
    const darkFg = calculateAccentForeground(0, 0, 0);

    lightVars["--accent"] = adaptiveConfig.light;
    lightVars["--accent-foreground"] = lightFg;
    lightVars["--focus"] = adaptiveConfig.light;

    darkVars["--accent"] = adaptiveConfig.dark;
    darkVars["--accent-foreground"] = darkFg;
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

  return `/*
 * HeroUI Theme Customization
 * Add this to your global.css after importing @heroui/styles
 * Only includes base variables from variables.css
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */

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
