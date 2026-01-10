/**
 * Color calculation utilities using apcach for APCA-based contrast calculations
 * Aligned with HeroUI theme system - starts with defaults from variables.css and applies hue/chroma adjustments
 */
import {formatRgb, parse} from "culori";

/* -------------------------------------------------------------------------------------------------
 * Default Theme Values (from packages/styles/themes/default/variables.css)
 * -----------------------------------------------------------------------------------------------*/

// Default base hue from accent color in variables.css
const DEFAULT_BASE_HUE = 253.83; // From --accent: oklch(0.6204 0.195 253.83)
const SEMANTIC_HUE_BLEND_FACTOR = 0.12; // 12% influence from base hue
const WARNING_HUE_DARK = 76.34; // Warning hue for dark theme (different from light theme)

// Default theme values from variables.css - these are the baseline that will be adjusted
const DEFAULT_THEME_VALUES = {
  light: {
    background: {l: 0.9702, c: 0, h: 0},
    foreground: {l: 0.2103, c: 0.0059, h: 285.89},
    surface: {l: 1, c: 0, h: 285.89}, // Pure white with adjustable hue/chroma
    overlay: {l: 1, c: 0, h: 285.89}, // Pure white with adjustable hue/chroma
    muted: {l: 0.5517, c: 0.0138, h: 285.94},
    scrollbar: {l: 0.871, c: 0.006, h: 286.286},
    default: {l: 0.94, c: 0.001, h: 286.375},
    accent: {l: 0.6204, c: 0.195, h: 253.83},
    border: {l: 0.9, c: 0.004, h: 286.32},
    separator: {l: 0.92, c: 0.004, h: 286.32},
    segment: {l: 1, c: 0, h: 285.89}, // Pure white with adjustable hue/chroma
    success: {l: 0.7329, c: 0.1935, h: 150.81},
    warning: {l: 0.7819, c: 0.1585, h: 72.33},
    danger: {l: 0.6532, c: 0.2328, h: 25.74},
  },
  dark: {
    background: {l: 0.12, c: 0.005, h: 285.823},
    foreground: {l: 0.9911, c: 0, h: 0},
    surface: {l: 0.2103, c: 0.0059, h: 285.89},
    overlay: {l: 0.2103, c: 0.0059, h: 285.89},
    muted: {l: 0.705, c: 0.015, h: 286.067},
    scrollbar: {l: 0.705, c: 0.015, h: 286.067},
    default: {l: 0.274, c: 0.006, h: 286.033},
    accent: {l: 0.6204, c: 0.195, h: 253.83}, // Same as light
    border: {l: 0.28, c: 0.006, h: 286.033},
    separator: {l: 0.25, c: 0.006, h: 286.033},
    segment: {l: 0.3964, c: 0.01, h: 285.93},
    success: {l: 0.7329, c: 0.1935, h: 150.81}, // Same as light
    warning: {l: 0.8203, c: 0.1388, h: WARNING_HUE_DARK},
    danger: {l: 0.594, c: 0.1967, h: 24.63},
  },
};

// Semantic color defaults (from variables.css)
const SEMANTIC_COLORS = {
  success: {
    hue: 150.81,
    chromaLight: 0.1935,
    chromaDark: 0.1935,
    lightnessLight: 0.7329,
    lightnessDark: 0.7329,
  },
  warning: {
    hue: 72.33,
    chromaLight: 0.1585,
    chromaDark: 0.1388,
    lightnessLight: 0.7819,
    lightnessDark: 0.8203,
  },
  danger: {
    hue: 25.74,
    chromaLight: 0.2328,
    chromaDark: 0.1967,
    lightnessLight: 0.6532,
    lightnessDark: 0.594,
  },
};

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export interface ThemeColor {
  name: string;
  oklchLight: string;
  oklchDark: string;
}

export interface GeneratedColors {
  background: ThemeColor;
  foreground: ThemeColor;
  accent: ThemeColor;
  accentForeground: ThemeColor;
  muted: ThemeColor;
  default: ThemeColor;
  defaultForeground: ThemeColor;
  surface: ThemeColor;
  overlay: ThemeColor;
  scrollbar: ThemeColor;
  segment: ThemeColor;
  border: ThemeColor;
  separator: ThemeColor;
  // Semantic colors
  success: ThemeColor;
  successForeground: ThemeColor;
  warning: ThemeColor;
  warningForeground: ThemeColor;
  danger: ThemeColor;
  dangerForeground: ThemeColor;
}

/* -------------------------------------------------------------------------------------------------
 * Utility Functions
 * -----------------------------------------------------------------------------------------------*/

/**
 * Adjust hue of a color object, keeping lightness and chroma
 */
function adjustHue(
  color: {l: number; c: number; h: number},
  newHue: number,
): {l: number; c: number; h: number} {
  return {...color, h: newHue};
}

/**
 * Adjust chroma of a color object, keeping lightness and hue
 */
function adjustChroma(
  color: {l: number; c: number; h: number},
  newChroma: number,
): {l: number; c: number; h: number} {
  return {...color, c: Math.max(0, newChroma)};
}

/**
 * Format a color object to OKLCH string
 */
function formatOklch(color: {l: number; c: number; h: number}): string {
  return `oklch(${color.l * 100}% ${color.c} ${color.h})`;
}

/**
 * Parse an OKLCH string or handle CSS variable references
 */
function parseOklchValue(
  value: string | {l: number; c: number; h: number},
): {l: number; c: number; h: number} | null {
  if (typeof value === "string") {
    // If it's a CSS variable reference, return null (will be handled separately)
    if (value.startsWith("var(")) {
      return null;
    }
    // Parse OKLCH string
    const match = value.match(/oklch\(([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\)/);

    if (match) {
      const l = match[1].includes("%") ? parseFloat(match[1]) / 100 : parseFloat(match[1]);
      const c = parseFloat(match[2]);
      const h = parseFloat(match[3]);

      return {l, c, h};
    }

    return null;
  }

  return value;
}

/**
 * Calculate a blended hue for semantic colors based on the base hue
 * This creates cohesion while maintaining semantic meaning
 */
function calculateSemanticHue(semanticDefaultHue: number, baseHue: number): number {
  const hueOffset = (baseHue - DEFAULT_BASE_HUE) * SEMANTIC_HUE_BLEND_FACTOR;
  let newHue = semanticDefaultHue + hueOffset;

  // Normalize to 0-360 range
  while (newHue < 0) newHue += 360;
  while (newHue >= 360) newHue -= 360;

  return newHue;
}

/**
 * Generate a semantic color with APCA-based contrast for foreground
 */
function generateSemanticColor(
  name: string,
  config: typeof SEMANTIC_COLORS.success,
  baseHue: number,
  grayChroma: number,
): {color: ThemeColor; foreground: ThemeColor} {
  // Calculate blended hue
  const adjustedHue = calculateSemanticHue(config.hue, baseHue);

  // Scale chroma slightly based on gray chroma for visual harmony
  // When gray chroma is low, keep semantic colors vibrant
  // When gray chroma is high, we can boost semantic colors slightly
  const chromaBoost = 1 + grayChroma * 2; // Small boost based on gray chroma

  const chromaLight = Math.min(config.chromaLight * chromaBoost, 0.35);
  const chromaDark = Math.min(config.chromaDark * chromaBoost, 0.35);

  const colorLight = `oklch(${config.lightnessLight * 100}% ${chromaLight} ${adjustedHue})`;
  const colorDark = `oklch(${config.lightnessDark * 100}% ${chromaDark} ${adjustedHue})`;

  // Determine foreground color based on semantic color lightness
  // Threshold ~0.67 matches original design:
  // - Success (0.73), Warning (0.78) → dark foreground
  // - Danger (0.65) → light foreground
  const LIGHTNESS_THRESHOLD = 0.67;

  // Light theme foreground: dark text for light backgrounds, light text for dark backgrounds
  const fgLightTheme =
    config.lightnessLight > LIGHTNESS_THRESHOLD
      ? `oklch(21.03% 0.0059 ${adjustedHue})` // Eclipse-like (dark)
      : `oklch(99.11% 0 0)`; // Snow (white)

  // Dark theme foreground: similar logic but for dark theme semantic colors
  const fgDarkTheme =
    config.lightnessDark > LIGHTNESS_THRESHOLD
      ? `oklch(21.03% 0.0059 ${adjustedHue})` // Eclipse-like (dark)
      : `oklch(99.11% 0 0)`; // Snow (white)

  return {
    color: {
      name: `--${name}`,
      oklchLight: colorLight,
      oklchDark: colorDark,
    },
    foreground: {
      name: `--${name}-foreground`,
      oklchLight: fgLightTheme,
      oklchDark: fgDarkTheme,
    },
  };
}

/**
 * Convert OKLCH to RGB string (for fallback)
 */
export function oklchToRgb(oklchString: string): string {
  const parsed = parse(oklchString);

  if (!parsed) return oklchString;

  return formatRgb(parsed);
}

/* -------------------------------------------------------------------------------------------------
 * Main Color Generation Function
 * -----------------------------------------------------------------------------------------------*/

/**
 * Generate all theme colors based on hue and chroma adjustments to defaults
 * Starts with values from variables.css and applies hue/chroma adjustments
 */
export function generateThemeColors(hue: number, chroma: number): GeneratedColors {
  // Helper to create ThemeColor from adjusted color values
  const createThemeColor = (
    name: string,
    lightValue: string | {l: number; c: number; h: number},
    darkValue: string | {l: number; c: number; h: number},
  ): ThemeColor => {
    // Handle CSS variable references (like var(--white), var(--eclipse))
    if (typeof lightValue === "string" && lightValue.startsWith("var(")) {
      return {
        name,
        oklchLight: lightValue,
        oklchDark: typeof darkValue === "string" ? darkValue : formatOklch(darkValue),
      };
    }

    const lightColor = typeof lightValue === "string" ? parseOklchValue(lightValue) : lightValue;
    const darkColor = typeof darkValue === "string" ? parseOklchValue(darkValue) : darkValue;

    return {
      name,
      oklchLight: lightColor
        ? formatOklch(lightColor)
        : typeof lightValue === "string"
          ? lightValue
          : formatOklch(lightValue),
      oklchDark: darkColor
        ? formatOklch(darkColor)
        : typeof darkValue === "string"
          ? darkValue
          : formatOklch(darkValue),
    };
  };

  // Get defaults
  const defaultsLight = DEFAULT_THEME_VALUES.light;
  const defaultsDark = DEFAULT_THEME_VALUES.dark;

  // --background: Apply hue and chroma adjustments
  const background: ThemeColor = {
    name: "--background",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.background, hue), chroma)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.background, hue), chroma)),
  };

  // --foreground: Uses CSS variables (eclipse/snow), no adjustment needed
  const foreground: ThemeColor = createThemeColor(
    "--foreground",
    defaultsLight.foreground,
    defaultsDark.foreground,
  );

  // --accent: Keep original chroma but adjust hue
  const accent: ThemeColor = {
    name: "--accent",
    oklchLight: formatOklch(adjustHue(defaultsLight.accent, hue)),
    oklchDark: formatOklch(adjustHue(defaultsDark.accent, hue)),
  };

  // --accent-foreground: Uses CSS variable (snow), no adjustment needed
  const accentForeground: ThemeColor = createThemeColor(
    "--accent-foreground",
    "var(--snow)",
    "var(--snow)",
  );

  // --muted: Apply hue and chroma adjustments
  const muted: ThemeColor = {
    name: "--muted",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.muted, hue), chroma)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.muted, hue), chroma)),
  };

  // --default: Apply hue and chroma adjustments
  const defaultColor: ThemeColor = {
    name: "--default",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.default, hue), chroma)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.default, hue), chroma)),
  };

  // --default-foreground: Uses CSS variables (eclipse/snow), adjust hue for eclipse
  const defaultForeground: ThemeColor = {
    name: "--default-foreground",
    oklchLight: `oklch(21.03% 0.0059 ${hue})`, // Eclipse with adjusted hue
    oklchDark: "var(--snow)", // Snow (white)
  };

  // --surface: Apply hue and chroma adjustments
  const surfaceColor: ThemeColor = {
    name: "--surface",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.surface, hue), chroma * 0.5)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.surface, hue), chroma * 2)),
  };

  // --overlay: Apply hue and chroma adjustments
  const overlayColor: ThemeColor = {
    name: "--overlay",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.overlay, hue), chroma * 0.3)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.overlay, hue), chroma * 2)),
  };

  // --scrollbar: Apply hue and chroma adjustments
  const scrollbar: ThemeColor = {
    name: "--scrollbar",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.scrollbar, hue), chroma)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.scrollbar, hue), chroma)),
  };

  // --segment: Apply hue and chroma adjustments
  const segment: ThemeColor = {
    name: "--segment",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.segment, hue), chroma)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.segment, hue), chroma)),
  };

  // --border: Apply hue and chroma adjustments
  const border: ThemeColor = {
    name: "--border",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.border, hue), chroma)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.border, hue), chroma)),
  };

  // --separator: Apply hue and chroma adjustments
  const separator: ThemeColor = {
    name: "--separator",
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.separator, hue), chroma)),
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.separator, hue), chroma)),
  };

  // Generate semantic colors with base hue blending
  const successColors = generateSemanticColor("success", SEMANTIC_COLORS.success, hue, chroma);
  const warningColors = generateSemanticColor("warning", SEMANTIC_COLORS.warning, hue, chroma);
  const dangerColors = generateSemanticColor("danger", SEMANTIC_COLORS.danger, hue, chroma);

  return {
    background,
    foreground,
    accent,
    accentForeground,
    muted,
    default: defaultColor,
    defaultForeground,
    surface: surfaceColor,
    overlay: overlayColor,
    scrollbar,
    segment,
    border,
    separator,
    // Semantic colors
    success: successColors.color,
    successForeground: successColors.foreground,
    warning: warningColors.color,
    warningForeground: warningColors.foreground,
    danger: dangerColors.color,
    dangerForeground: dangerColors.foreground,
  };
}

/**
 * Build CSS variables string for a theme
 * Only generates variables that exist in variables.css
 */
export function buildThemeCssVars(colors: GeneratedColors, theme: "light" | "dark"): string {
  const isLight = theme === "light";
  const vars: string[] = [];

  const getValue = (color: ThemeColor) => (isLight ? color.oklchLight : color.oklchDark);

  // Background and foreground
  vars.push(`--background: ${getValue(colors.background)}`);
  vars.push(`--color-background: ${getValue(colors.background)}`);
  vars.push(`--foreground: ${getValue(colors.foreground)}`);
  vars.push(`--color-foreground: ${getValue(colors.foreground)}`);

  // Accent colors
  vars.push(`--accent: ${getValue(colors.accent)}`);
  vars.push(`--color-accent: ${getValue(colors.accent)}`);
  vars.push(`--accent-foreground: ${getValue(colors.accentForeground)}`);
  vars.push(`--color-accent-foreground: ${getValue(colors.accentForeground)}`);
  vars.push(`--focus: ${getValue(colors.accent)}`);
  vars.push(`--color-focus: ${getValue(colors.accent)}`);

  // Accent variations using color-mix (calculated in theme.css)
  const accentValue = getValue(colors.accent);
  const accentFgValue = getValue(colors.accentForeground);

  vars.push(`--color-accent-hover: color-mix(in oklab, ${accentValue} 90%, ${accentFgValue} 10%)`);
  vars.push(`--color-accent-soft: color-mix(in oklab, ${accentValue} 15%, transparent)`);
  vars.push(`--color-accent-soft-foreground: ${accentValue}`);
  vars.push(`--color-accent-soft-hover: color-mix(in oklab, ${accentValue} 20%, transparent)`);

  // Muted
  vars.push(`--muted: ${getValue(colors.muted)}`);
  vars.push(`--color-muted: ${getValue(colors.muted)}`);
  vars.push(`--field-placeholder: ${getValue(colors.muted)}`);
  vars.push(`--color-field-placeholder: ${getValue(colors.muted)}`);

  // Default (switch track, slider track, secondary buttons)
  vars.push(`--default: ${getValue(colors.default)}`);
  vars.push(`--color-default: ${getValue(colors.default)}`);

  // Default foreground
  vars.push(`--default-foreground: ${getValue(colors.defaultForeground)}`);
  vars.push(`--color-default-foreground: ${getValue(colors.defaultForeground)}`);

  // Default hover (calculated in theme.css)
  const defaultValue = getValue(colors.default);

  vars.push(
    `--color-default-hover: color-mix(in oklab, ${defaultValue} 90%, ${getValue(colors.foreground)} 10%)`,
  );

  // Surface (solid color for cards, accordions, etc.)
  vars.push(`--surface: ${getValue(colors.surface)}`);
  vars.push(`--color-surface: ${getValue(colors.surface)}`);
  vars.push(`--surface-foreground: ${getValue(colors.foreground)}`);
  vars.push(`--color-surface-foreground: ${getValue(colors.foreground)}`);

  // Overlay (tooltips, popovers, modals)
  vars.push(`--overlay: ${getValue(colors.overlay)}`);
  vars.push(`--color-overlay: ${getValue(colors.overlay)}`);
  vars.push(`--overlay-foreground: ${getValue(colors.foreground)}`);
  vars.push(`--color-overlay-foreground: ${getValue(colors.foreground)}`);

  // Scrollbar
  vars.push(`--scrollbar: ${getValue(colors.scrollbar)}`);
  vars.push(`--color-scrollbar: ${getValue(colors.scrollbar)}`);

  // Segment (segmented controls)
  vars.push(`--segment: ${getValue(colors.segment)}`);
  vars.push(`--color-segment: ${getValue(colors.segment)}`);
  vars.push(`--segment-foreground: ${getValue(colors.foreground)}`);
  vars.push(`--color-segment-foreground: ${getValue(colors.foreground)}`);

  // Border
  vars.push(`--border: ${getValue(colors.border)}`);
  vars.push(`--color-border: ${getValue(colors.border)}`);

  // Separator
  vars.push(`--separator: ${getValue(colors.separator)}`);
  vars.push(`--color-separator: ${getValue(colors.separator)}`);

  // Semantic colors (success, warning, danger)
  // These are blended with the base hue for visual cohesion
  vars.push(`--success: ${getValue(colors.success)}`);
  vars.push(`--color-success: ${getValue(colors.success)}`);
  vars.push(`--success-foreground: ${getValue(colors.successForeground)}`);
  vars.push(`--color-success-foreground: ${getValue(colors.successForeground)}`);

  // Success soft variants using color-mix (calculated in theme.css)
  const successValue = getValue(colors.success);

  vars.push(
    `--color-success-hover: color-mix(in oklab, ${successValue} 90%, ${getValue(colors.successForeground)} 10%)`,
  );
  vars.push(`--color-success-soft: color-mix(in oklab, ${successValue} 15%, transparent)`);
  vars.push(`--color-success-soft-foreground: ${successValue}`);
  vars.push(`--color-success-soft-hover: color-mix(in oklab, ${successValue} 20%, transparent)`);

  vars.push(`--warning: ${getValue(colors.warning)}`);
  vars.push(`--color-warning: ${getValue(colors.warning)}`);
  vars.push(`--warning-foreground: ${getValue(colors.warningForeground)}`);
  vars.push(`--color-warning-foreground: ${getValue(colors.warningForeground)}`);

  // Warning soft variants (calculated in theme.css)
  const warningValue = getValue(colors.warning);

  vars.push(
    `--color-warning-hover: color-mix(in oklab, ${warningValue} 90%, ${getValue(colors.warningForeground)} 10%)`,
  );
  vars.push(`--color-warning-soft: color-mix(in oklab, ${warningValue} 15%, transparent)`);
  vars.push(`--color-warning-soft-foreground: ${warningValue}`);
  vars.push(`--color-warning-soft-hover: color-mix(in oklab, ${warningValue} 20%, transparent)`);

  vars.push(`--danger: ${getValue(colors.danger)}`);
  vars.push(`--color-danger: ${getValue(colors.danger)}`);
  vars.push(`--danger-foreground: ${getValue(colors.dangerForeground)}`);
  vars.push(`--color-danger-foreground: ${getValue(colors.dangerForeground)}`);

  // Danger soft variants (calculated in theme.css)
  const dangerValue = getValue(colors.danger);

  vars.push(
    `--color-danger-hover: color-mix(in oklab, ${dangerValue} 90%, ${getValue(colors.dangerForeground)} 10%)`,
  );
  vars.push(`--color-danger-soft: color-mix(in oklab, ${dangerValue} 15%, transparent)`);
  vars.push(`--color-danger-soft-foreground: ${dangerValue}`);
  vars.push(`--color-danger-soft-hover: color-mix(in oklab, ${dangerValue} 20%, transparent)`);

  return vars.join(";\n  ");
}

/**
 * Get all generated colors as a flat array for display
 */
export function getColorVariablesArray(
  colors: GeneratedColors,
  theme: "light" | "dark",
): Array<{name: string; value: string}> {
  const isLight = theme === "light";
  const getValue = (color: ThemeColor) => (isLight ? color.oklchLight : color.oklchDark);

  return [
    {name: "--background", value: getValue(colors.background)},
    {name: "--foreground", value: getValue(colors.foreground)},
    {name: "--surface", value: getValue(colors.surface)},
    {name: "--overlay", value: getValue(colors.overlay)},
    {name: "--default", value: getValue(colors.default)},
    {name: "--default-foreground", value: getValue(colors.defaultForeground)},
    {name: "--accent", value: getValue(colors.accent)},
    {name: "--accent-foreground", value: getValue(colors.accentForeground)},
    {name: "--muted", value: getValue(colors.muted)},
    {name: "--scrollbar", value: getValue(colors.scrollbar)},
    {name: "--segment", value: getValue(colors.segment)},
    {name: "--border", value: getValue(colors.border)},
    {name: "--separator", value: getValue(colors.separator)},
    // Semantic colors
    {name: "--success", value: getValue(colors.success)},
    {name: "--success-foreground", value: getValue(colors.successForeground)},
    {name: "--warning", value: getValue(colors.warning)},
    {name: "--warning-foreground", value: getValue(colors.warningForeground)},
    {name: "--danger", value: getValue(colors.danger)},
    {name: "--danger-foreground", value: getValue(colors.dangerForeground)},
  ];
}
