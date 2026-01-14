/**
 * Color generation utilities for the HeroUI Theme Builder
 * Generates all theme colors based on hue, chroma, AND lightness adjustments
 *
 * Based on packages/storybook/.storybook/utils/apcach-colors.ts but extended
 * to support lightness customization for accent colors.
 */

/* -------------------------------------------------------------------------------------------------
 * Default Theme Values (from packages/styles/themes/default/variables.css)
 * -----------------------------------------------------------------------------------------------*/

// Default accent values from variables.css: oklch(0.6204 0.195 253.83)
export const DEFAULT_ACCENT = {
  chroma: 0.195,
  hue: 253.83,
  lightness: 0.6204,
};

const SEMANTIC_HUE_BLEND_FACTOR = 0.12; // 12% influence from base hue

// Default theme values from variables.css - these are the baseline that will be adjusted
const DEFAULT_THEME_VALUES = {
  dark: {
    background: {c: 0.005, h: 285.823, l: 0.12},
    border: {c: 0.006, h: 286.033, l: 0.28},
    default: {c: 0.006, h: 286.033, l: 0.274},

    foreground: {c: 0, h: 0, l: 0.9911},

    muted: {c: 0.015, h: 286.067, l: 0.705},

    overlay: {c: 0.0059, h: 285.89, l: 0.2103},

    scrollbar: {c: 0.015, h: 286.067, l: 0.705},

    segment: {c: 0.01, h: 285.93, l: 0.3964},

    separator: {c: 0.006, h: 286.033, l: 0.25},
    // Snow
    surface: {c: 0.0059, h: 285.89, l: 0.2103},
  },
  light: {
    background: {c: 0, h: 0, l: 0.9702},
    border: {c: 0.004, h: 286.32, l: 0.9},

    default: {c: 0.001, h: 286.375, l: 0.94},

    foreground: {c: 0.0059, h: 285.89, l: 0.2103},

    // Pure white
    muted: {c: 0.0138, h: 285.94, l: 0.5517},
    // Pure white
    overlay: {c: 0, h: 0, l: 1},
    scrollbar: {c: 0.006, h: 286.286, l: 0.871},
    segment: {c: 0, h: 0, l: 1},
    separator: {c: 0.004, h: 286.32, l: 0.92},
    surface: {c: 0, h: 0, l: 1}, // Pure white
  },
};

// Semantic color defaults (from variables.css)
const SEMANTIC_COLORS = {
  danger: {
    chromaDark: 0.1967,
    chromaLight: 0.2328,
    hue: 25.74,
    hueDark: 24.63,
    lightnessDark: 0.594,
    lightnessLight: 0.6532,
  },
  success: {
    chromaDark: 0.1935,
    chromaLight: 0.1935,
    hue: 150.81,
    lightnessDark: 0.7329,
    lightnessLight: 0.7329,
  },
  warning: {
    chromaDark: 0.1388,

    // Warning hue for dark theme (different from light theme)
    chromaLight: 0.1585,
    hue: 72.33,
    hueDark: 76.34,
    lightnessDark: 0.8203,
    lightnessLight: 0.7819,
  },
};

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export interface OklchColor {
  l: number;
  c: number;
  h: number;
}

export interface ThemeColor {
  name: string;
  oklchLight: string;
  oklchDark: string;
}

export interface GeneratedThemeColors {
  // Core colors
  background: ThemeColor;
  foreground: ThemeColor;
  accent: ThemeColor;
  accentForeground: ThemeColor;
  focus: ThemeColor;

  // UI colors
  muted: ThemeColor;
  default: ThemeColor;
  defaultForeground: ThemeColor;
  surface: ThemeColor;
  surfaceForeground: ThemeColor;
  overlay: ThemeColor;
  overlayForeground: ThemeColor;
  scrollbar: ThemeColor;
  segment: ThemeColor;
  segmentForeground: ThemeColor;
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

export interface ColorGenerationParams {
  /** Lightness value for accent color (0-1) */
  lightness: number;
  /** Chroma value for accent and gray tinting (0-0.4) */
  chroma: number;
  /** Hue value for all colors (0-360) */
  hue: number;
  /** Base chroma for gray/neutral colors (optional, defaults to subtle value) */
  grayChroma?: number;
}

/* -------------------------------------------------------------------------------------------------
 * Utility Functions
 * -----------------------------------------------------------------------------------------------*/

/**
 * Adjust hue of a color object, keeping lightness and chroma
 */
function adjustHue(color: OklchColor, newHue: number): OklchColor {
  return {...color, h: newHue};
}

/**
 * Adjust chroma of a color object, keeping lightness and hue
 */
function adjustChroma(color: OklchColor, newChroma: number): OklchColor {
  return {...color, c: Math.max(0, newChroma)};
}

/**
 * Format a color object to OKLCH string
 */
export function formatOklch(color: OklchColor): string {
  return `oklch(${(color.l * 100).toFixed(2)}% ${color.c.toFixed(4)} ${color.h.toFixed(2)})`;
}

/**
 * Parse an OKLCH string to color object
 */
export function parseOklch(value: string): OklchColor | null {
  // Handle CSS variable references
  if (value.startsWith("var(")) {
    return null;
  }

  // Parse OKLCH string - format: oklch(L C H) or oklch(L% C H)
  const match = value.match(/oklch\(([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+|none)\)/);

  if (match && match[1] && match[2] && match[3]) {
    const l = match[1].includes("%") ? parseFloat(match[1]) / 100 : parseFloat(match[1]);
    const c = parseFloat(match[2]);
    const h = match[3] === "none" ? 0 : parseFloat(match[3]);

    // Normalize lightness if given as percentage > 1
    const normalizedL = l > 1 ? l / 100 : l;

    return {c, h, l: normalizedL};
  }

  return null;
}

/**
 * Calculate a blended hue for semantic colors based on the base hue
 * This creates cohesion while maintaining semantic meaning
 */
function calculateSemanticHue(semanticDefaultHue: number, baseHue: number): number {
  const hueOffset = (baseHue - DEFAULT_ACCENT.hue) * SEMANTIC_HUE_BLEND_FACTOR;
  let newHue = semanticDefaultHue + hueOffset;

  // Normalize to 0-360 range
  while (newHue < 0) newHue += 360;
  while (newHue >= 360) newHue -= 360;

  return newHue;
}

/**
 * Calculate foreground color based on background lightness
 * Uses OKLCH perceptual uniformity for accurate contrast decisions
 */
export function calculateForeground(oklchString: string): string {
  const color = parseOklch(oklchString);

  if (!color) return "oklch(99.11% 0 0)"; // fallback to snow

  const {c, h, l} = color;

  // OKLCH lightness is perceptually uniform, 0.65 is a good threshold
  if (l > 0.65) {
    // Light background → dark foreground
    return `oklch(15% ${Math.min(c * 0.3, 0.05).toFixed(4)} ${h.toFixed(2)})`;
  } else {
    // Dark background → light foreground
    return `oklch(98% ${Math.min(c * 0.1, 0.02).toFixed(4)} ${h.toFixed(2)})`;
  }
}

/**
 * Calculate accent foreground color for solid accent backgrounds
 * Optimized for button text on accent-colored backgrounds
 */
export function calculateAccentForeground(lightness: number, chroma: number, hue: number): string {
  // For accent colors, we typically want high contrast
  // If accent is light (> 0.65), use dark foreground
  // If accent is dark (< 0.65), use light foreground
  if (lightness > 0.65) {
    return `oklch(15% ${Math.min(chroma * 0.2, 0.03).toFixed(4)} ${hue.toFixed(2)})`;
  } else {
    return `oklch(99.11% 0 0)`; // Snow white for dark accents
  }
}

/**
 * Generate a semantic color with appropriate foreground
 */
function generateSemanticColor(
  name: string,
  config: (typeof SEMANTIC_COLORS)["success"],
  baseHue: number,
  grayChroma: number,
): {color: ThemeColor; foreground: ThemeColor} {
  // Calculate blended hue
  const adjustedHue = calculateSemanticHue(config.hue, baseHue);
  const adjustedHueDark = calculateSemanticHue(
    "hueDark" in config ? (config.hueDark as number) : config.hue,
    baseHue,
  );

  // Scale chroma slightly based on gray chroma for visual harmony
  const chromaBoost = 1 + grayChroma * 2;
  const chromaLight = Math.min(config.chromaLight * chromaBoost, 0.35);
  const chromaDark = Math.min(config.chromaDark * chromaBoost, 0.35);

  const colorLight = formatOklch({c: chromaLight, h: adjustedHue, l: config.lightnessLight});
  const colorDark = formatOklch({c: chromaDark, h: adjustedHueDark, l: config.lightnessDark});

  // Determine foreground color based on semantic color lightness
  // Threshold ~0.67: Success (0.73), Warning (0.78) → dark fg; Danger (0.65) → light fg
  const LIGHTNESS_THRESHOLD = 0.67;

  const fgLightTheme =
    config.lightnessLight > LIGHTNESS_THRESHOLD
      ? formatOklch({c: 0.0059, h: adjustedHue, l: 0.2103}) // Eclipse-like (dark)
      : "oklch(99.11% 0 0)"; // Snow (white)

  const fgDarkTheme =
    config.lightnessDark > LIGHTNESS_THRESHOLD
      ? formatOklch({c: 0.0059, h: adjustedHueDark, l: 0.2103}) // Eclipse-like (dark)
      : "oklch(99.11% 0 0)"; // Snow (white)

  return {
    color: {
      name: `--${name}`,
      oklchDark: colorDark,
      oklchLight: colorLight,
    },
    foreground: {
      name: `--${name}-foreground`,
      oklchDark: fgDarkTheme,
      oklchLight: fgLightTheme,
    },
  };
}

/* -------------------------------------------------------------------------------------------------
 * Main Color Generation Function
 * -----------------------------------------------------------------------------------------------*/

/**
 * Generate all theme colors based on lightness, chroma, and hue
 *
 * Unlike the storybook version, this supports:
 * - Lightness customization for accent colors
 * - Full theme color generation for both light and dark modes
 */
export function generateThemeColors(params: ColorGenerationParams): GeneratedThemeColors {
  const {lightness, chroma, hue, grayChroma = Math.min(chroma * 0.05, 0.015)} = params;

  // Get defaults
  const defaultsLight = DEFAULT_THEME_VALUES.light;
  const defaultsDark = DEFAULT_THEME_VALUES.dark;

  // --accent: Apply all three parameters (lightness, chroma, hue)
  const accentLight = formatOklch({c: chroma, h: hue, l: lightness});
  const accentDark = formatOklch({c: chroma, h: hue, l: lightness}); // Same for both modes typically

  const accent: ThemeColor = {
    name: "--accent",
    oklchDark: accentDark,
    oklchLight: accentLight,
  };

  // --accent-foreground: Calculated based on accent lightness
  const accentForeground: ThemeColor = {
    name: "--accent-foreground",
    oklchDark: calculateAccentForeground(lightness, chroma, hue),
    oklchLight: calculateAccentForeground(lightness, chroma, hue),
  };

  // --focus: Same as accent
  const focus: ThemeColor = {
    name: "--focus",
    oklchDark: accentDark,
    oklchLight: accentLight,
  };

  // --background: Apply hue and gray chroma adjustments
  const background: ThemeColor = {
    name: "--background",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.background, hue), grayChroma)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.background, hue), grayChroma)),
  };

  // --foreground: Adjust hue only for slight tinting
  const foreground: ThemeColor = {
    name: "--foreground",
    oklchDark: formatOklch(defaultsDark.foreground),
    oklchLight: formatOklch(adjustHue(defaultsLight.foreground, hue)), // Snow stays neutral
  };

  // --muted: Apply hue and gray chroma adjustments
  const muted: ThemeColor = {
    name: "--muted",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.muted, hue), grayChroma * 2)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.muted, hue), grayChroma * 2)),
  };

  // --default: Apply hue and gray chroma adjustments
  const defaultColor: ThemeColor = {
    name: "--default",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.default, hue), grayChroma)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.default, hue), grayChroma)),
  };

  // --default-foreground: Eclipse with adjusted hue / Snow
  const defaultForeground: ThemeColor = {
    name: "--default-foreground",
    oklchDark: "oklch(99.11% 0 0)",
    oklchLight: formatOklch({c: 0.0059, h: hue, l: 0.2103}), // Snow
  };

  // --surface: Apply subtle hue and chroma
  const surface: ThemeColor = {
    name: "--surface",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.surface, hue), grayChroma * 2)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.surface, hue), grayChroma * 0.5)),
  };

  // --surface-foreground: Same as foreground
  const surfaceForeground: ThemeColor = {
    name: "--surface-foreground",
    oklchDark: foreground.oklchDark,
    oklchLight: foreground.oklchLight,
  };

  // --overlay: Apply subtle hue and chroma
  const overlay: ThemeColor = {
    name: "--overlay",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.overlay, hue), grayChroma * 2)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.overlay, hue), grayChroma * 0.3)),
  };

  // --overlay-foreground: Same as foreground
  const overlayForeground: ThemeColor = {
    name: "--overlay-foreground",
    oklchDark: foreground.oklchDark,
    oklchLight: foreground.oklchLight,
  };

  // --scrollbar: Apply hue and gray chroma
  const scrollbar: ThemeColor = {
    name: "--scrollbar",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.scrollbar, hue), grayChroma)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.scrollbar, hue), grayChroma)),
  };

  // --segment: Apply hue and gray chroma
  const segment: ThemeColor = {
    name: "--segment",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.segment, hue), grayChroma)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.segment, hue), grayChroma)),
  };

  // --segment-foreground: Same as foreground
  const segmentForeground: ThemeColor = {
    name: "--segment-foreground",
    oklchDark: foreground.oklchDark,
    oklchLight: foreground.oklchLight,
  };

  // --border: Apply hue and gray chroma
  const border: ThemeColor = {
    name: "--border",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.border, hue), grayChroma)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.border, hue), grayChroma)),
  };

  // --separator: Apply hue and gray chroma
  const separator: ThemeColor = {
    name: "--separator",
    oklchDark: formatOklch(adjustChroma(adjustHue(defaultsDark.separator, hue), grayChroma)),
    oklchLight: formatOklch(adjustChroma(adjustHue(defaultsLight.separator, hue), grayChroma)),
  };

  // Generate semantic colors with base hue blending
  const successColors = generateSemanticColor("success", SEMANTIC_COLORS.success, hue, grayChroma);
  const warningColors = generateSemanticColor("warning", SEMANTIC_COLORS.warning, hue, grayChroma);
  const dangerColors = generateSemanticColor("danger", SEMANTIC_COLORS.danger, hue, grayChroma);

  return {
    accent,

    accentForeground,
    // Core colors
    background,
    border,
    danger: dangerColors.color,

    dangerForeground: dangerColors.foreground,

    default: defaultColor,

    defaultForeground,

    focus,

    foreground,
    // UI colors
    muted,
    overlay,
    overlayForeground,
    scrollbar,
    segment,
    segmentForeground,
    separator,

    // Semantic colors
    success: successColors.color,

    successForeground: successColors.foreground,

    surface,
    surfaceForeground,
    warning: warningColors.color,
    warningForeground: warningColors.foreground,
  };
}

/* -------------------------------------------------------------------------------------------------
 * CSS Variable Building
 * -----------------------------------------------------------------------------------------------*/

/**
 * Accent-derived CSS variables that use color-mix for hover/soft variants
 */
export function getAccentDerivedVariables(
  accentValue: string,
  accentFgValue: string,
): Record<string, string> {
  return {
    "--color-accent": "var(--accent)",
    "--color-accent-foreground": "var(--accent-foreground)",
    "--color-accent-hover": `color-mix(in oklab, ${accentValue} 90%, ${accentFgValue} 10%)`,
    "--color-accent-soft": `color-mix(in oklab, ${accentValue} 15%, transparent)`,
    "--color-accent-soft-foreground": accentValue,
    "--color-accent-soft-hover": `color-mix(in oklab, ${accentValue} 20%, transparent)`,
    "--color-focus": "var(--focus)",
    "--tw-ring-color": "var(--focus)",
  };
}

/**
 * Semantic color derived variables (hover, soft variants)
 */
export function getSemanticDerivedVariables(
  colorName: string,
  colorValue: string,
  foregroundValue: string,
): Record<string, string> {
  return {
    [`--color-${colorName}`]: `var(--${colorName})`,
    [`--color-${colorName}-foreground`]: `var(--${colorName}-foreground)`,
    [`--color-${colorName}-hover`]: `color-mix(in oklab, ${colorValue} 90%, ${foregroundValue} 10%)`,
    [`--color-${colorName}-soft`]: `color-mix(in oklab, ${colorValue} 15%, transparent)`,
    [`--color-${colorName}-soft-foreground`]: colorValue,
    [`--color-${colorName}-soft-hover`]: `color-mix(in oklab, ${colorValue} 20%, transparent)`,
  };
}

/**
 * Radius-derived variables
 */
export const radiusDerivedVariables: Record<string, string> = {
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
 * Get all color variables as a flat record for applying to an element
 */
export function getColorVariablesForElement(
  colors: GeneratedThemeColors,
  theme: "light" | "dark",
): Record<string, string> {
  const isLight = theme === "light";
  const getValue = (color: ThemeColor) => (isLight ? color.oklchLight : color.oklchDark);

  const vars: Record<string, string> = {};

  // Core colors
  vars["--background"] = getValue(colors.background);
  vars["--color-background"] = getValue(colors.background);
  vars["--foreground"] = getValue(colors.foreground);
  vars["--color-foreground"] = getValue(colors.foreground);

  // Accent
  vars["--accent"] = getValue(colors.accent);
  vars["--accent-foreground"] = getValue(colors.accentForeground);
  vars["--focus"] = getValue(colors.focus);

  // UI colors
  vars["--muted"] = getValue(colors.muted);
  vars["--color-muted"] = getValue(colors.muted);
  vars["--field-placeholder"] = getValue(colors.muted);

  vars["--default"] = getValue(colors.default);
  vars["--color-default"] = getValue(colors.default);
  vars["--default-foreground"] = getValue(colors.defaultForeground);
  vars["--color-default-foreground"] = getValue(colors.defaultForeground);

  vars["--surface"] = getValue(colors.surface);
  vars["--color-surface"] = getValue(colors.surface);
  vars["--surface-foreground"] = getValue(colors.surfaceForeground);
  vars["--color-surface-foreground"] = getValue(colors.surfaceForeground);

  vars["--overlay"] = getValue(colors.overlay);
  vars["--color-overlay"] = getValue(colors.overlay);
  vars["--overlay-foreground"] = getValue(colors.overlayForeground);
  vars["--color-overlay-foreground"] = getValue(colors.overlayForeground);

  vars["--scrollbar"] = getValue(colors.scrollbar);
  vars["--color-scrollbar"] = getValue(colors.scrollbar);

  vars["--segment"] = getValue(colors.segment);
  vars["--color-segment"] = getValue(colors.segment);
  vars["--segment-foreground"] = getValue(colors.segmentForeground);
  vars["--color-segment-foreground"] = getValue(colors.segmentForeground);

  vars["--border"] = getValue(colors.border);
  vars["--color-border"] = getValue(colors.border);

  vars["--separator"] = getValue(colors.separator);
  vars["--color-separator"] = getValue(colors.separator);

  // Semantic colors
  vars["--success"] = getValue(colors.success);
  vars["--success-foreground"] = getValue(colors.successForeground);

  vars["--warning"] = getValue(colors.warning);
  vars["--warning-foreground"] = getValue(colors.warningForeground);

  vars["--danger"] = getValue(colors.danger);
  vars["--danger-foreground"] = getValue(colors.dangerForeground);

  return vars;
}
