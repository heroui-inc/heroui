import type {ThemeVariables} from "../constants";
import type {GeneratedThemeColors} from "./generate-theme-colors";

import {adaptiveColors, fontMap, radiusCssMap} from "../constants";

import {
  calculateAccentForeground,
  generateThemeColors,
  getAccentDerivedVariables,
  getColorVariablesForElement,
  getSemanticDerivedVariables,
} from "./generate-theme-colors";

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

  // Merge all vars
  const allVars = {
    ...vars,
    ...accentDerived,
    ...successDerived,
    ...warningDerived,
    ...dangerDerived,
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
 */
export function generateCssVariables(variables: ThemeVariables): string {
  const font = fontMap[variables.fontFamily];
  const {chroma, hue, lightness} = variables;
  const accentColor = `oklch(${lightness} ${chroma} ${hue})`;
  const adaptiveConfig = adaptiveColors[accentColor];

  // Generate theme colors
  const colors = generateThemeColors({chroma, hue, lightness});

  // Build radius CSS
  const radiusCSS = `
  /* Border Radius */
  --radius: ${radiusCssMap[variables.radius]};
  --field-radius: ${radiusCssMap[variables.formRadius]};`;

  // Build font CSS
  const fontCSS = `
  /* Font Family */
  /* Make sure to load ${font.label} font in your app */
  --font-sans: var(${font.variable});`;

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
 * Generates a minimal CSS output with only the essential customizations.
 * This is useful when users only want to change accent, radius, and font.
 */
export function generateMinimalCssVariables(variables: ThemeVariables): string {
  const font = fontMap[variables.fontFamily];
  const {chroma, hue, lightness} = variables;
  const accentColor = `oklch(${lightness} ${chroma} ${hue})`;
  const adaptiveConfig = adaptiveColors[accentColor];

  if (adaptiveConfig) {
    const lightForeground = calculateAccentForeground(1, 0, 0);
    const darkForeground = calculateAccentForeground(0, 0, 0);

    return `/*
 * HeroUI Theme Customization (Minimal)
 * Add this to your global.css after importing @heroui/styles
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */

:root,
.light,
.default,
[data-theme="light"],
[data-theme="default"] {
  /* Accent & Focus Color (Light Mode) */
  --accent: ${adaptiveConfig.light};
  --accent-foreground: ${lightForeground};
  --focus: ${adaptiveConfig.light};

  /* Border Radius */
  --radius: ${radiusCssMap[variables.radius]};
  --field-radius: ${radiusCssMap[variables.formRadius]};

  /* Font Family */
  /* Make sure to load ${font.label} font in your app */
  --font-sans: var(${font.variable});
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
  /* Accent & Focus Color (Dark Mode) */
  --accent: ${adaptiveConfig.dark};
  --accent-foreground: ${darkForeground};
  --focus: ${adaptiveConfig.dark};
}`;
  }

  const accentForeground = calculateAccentForeground(lightness, chroma, hue);

  return `/*
 * HeroUI Theme Customization (Minimal)
 * Add this to your global.css after importing @heroui/styles
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */

:root {
  /* Accent & Focus Color */
  --accent: ${accentColor};
  --accent-foreground: ${accentForeground};
  --focus: ${accentColor};

  /* Border Radius */
  --radius: ${radiusCssMap[variables.radius]};
  --field-radius: ${radiusCssMap[variables.formRadius]};

  /* Font Family */
  /* Make sure to load ${font.label} font in your app */
  --font-sans: var(${font.variable});
}`;
}
