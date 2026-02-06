/**
 * Oklch color utilities for parsing and manipulating Oklch color values
 */

export interface OklchColor {
  /** Lightness (0-1) */
  l: number;
  /** Chroma (0-0.4+) */
  c: number;
  /** Hue (0-360) */
  h: number;
  /** Alpha (0-1) */
  alpha?: number;
}

/**
 * Parse an Oklch color string into its components
 * Supports formats: oklch(L C H), oklch(L C H / A), oklch(L% C H)
 */
export function parseOklch(colorString: string): OklchColor | null {
  if (!colorString) return null;

  const trimmed = colorString.trim().toLowerCase();

  // Match oklch(...) format
  const match = trimmed.match(
    /^oklch\(\s*([0-9.]+%?)\s+([0-9.]+)\s+([0-9.]+)\s*(?:\/\s*([0-9.]+%?))?\s*\)$/,
  );

  if (!match) return null;

  let l = parseFloat(match[1]);
  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);
  let alpha = match[4] ? parseFloat(match[4]) : 1;

  // Handle percentage for lightness
  if (match[1].includes("%")) {
    l = l / 100;
  }

  // Handle percentage for alpha
  if (match[4]?.includes("%")) {
    alpha = alpha / 100;
  }

  return {l, c, h, alpha};
}

/**
 * Format an OklchColor object back to a CSS string
 */
export function formatOklch(color: OklchColor, includeAlpha = false): string {
  const {alpha, c, h, l} = color;

  if (includeAlpha && alpha !== undefined && alpha < 1) {
    return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)} / ${alpha})`;
  }

  return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
}

/**
 * Create an Oklch color with modified hue
 */
export function withHue(color: OklchColor, hue: number): OklchColor {
  return {...color, h: hue % 360};
}

/**
 * Create an Oklch color with modified chroma
 */
export function withChroma(color: OklchColor, chroma: number): OklchColor {
  return {...color, c: Math.max(0, chroma)};
}

/**
 * Create an Oklch color with modified lightness
 */
export function withLightness(color: OklchColor, lightness: number): OklchColor {
  return {...color, l: Math.max(0, Math.min(1, lightness))};
}

/**
 * Generate a palette of colors based on a base hue and chroma
 * @param baseHue - The base hue angle (0-360)
 * @param chroma - The chroma/saturation value
 * @param steps - Number of lightness steps to generate
 */
export function generatePalette(baseHue: number, chroma: number, steps = 10): OklchColor[] {
  const palette: OklchColor[] = [];

  for (let i = 0; i < steps; i++) {
    const lightness = 0.95 - (i / (steps - 1)) * 0.8; // Range from 0.95 to 0.15

    palette.push({
      l: lightness,
      c: chroma,
      h: baseHue,
    });
  }

  return palette;
}

/**
 * Calculate appropriate foreground color (black or white) for a given Oklch background
 */
export function calculateForegroundColor(bgColor: OklchColor): "black" | "white" {
  // Use lightness to determine foreground - simple threshold at 0.6
  return bgColor.l > 0.6 ? "black" : "white";
}

/**
 * Adjust chroma for gray tones
 * @param baseChroma - The base chroma value
 * @param grayAmount - Amount of color in gray (0-1, where 0 is pure gray)
 */
export function adjustGrayChroma(baseChroma: number, grayAmount: number): number {
  return baseChroma * grayAmount;
}

/**
 * List of CSS color variable names that use Oklch values in HeroUI
 */
export const COLOR_VARIABLES = [
  // Primitive colors
  {name: "--white", label: "White", category: "primitive"},
  {name: "--black", label: "Black", category: "primitive"},
  {name: "--snow", label: "Snow", category: "primitive"},
  {name: "--eclipse", label: "Eclipse", category: "primitive"},

  // Base colors
  {name: "--background", label: "Background", category: "base"},
  {name: "--foreground", label: "Foreground", category: "base"},
  {name: "--surface", label: "Surface", category: "surface"},
  {name: "--surface-foreground", label: "Surface Foreground", category: "surface"},
  {name: "--surface-secondary", label: "Surface Secondary", category: "surface"},
  {name: "--surface-secondary-foreground", label: "Surface Secondary FG", category: "surface"},
  {name: "--surface-tertiary", label: "Surface Tertiary", category: "surface"},
  {name: "--surface-tertiary-foreground", label: "Surface Tertiary FG", category: "surface"},
  {name: "--overlay", label: "Overlay", category: "overlay"},
  {name: "--overlay-foreground", label: "Overlay Foreground", category: "overlay"},

  // Semantic colors
  {name: "--muted", label: "Muted", category: "semantic"},
  {name: "--default", label: "Default", category: "semantic"},
  {name: "--default-foreground", label: "Default Foreground", category: "semantic"},
  {name: "--accent", label: "Accent", category: "accent"},
  {name: "--accent-foreground", label: "Accent Foreground", category: "accent"},

  // Status colors
  {name: "--success", label: "Success", category: "status"},
  {name: "--success-foreground", label: "Success Foreground", category: "status"},
  {name: "--warning", label: "Warning", category: "status"},
  {name: "--warning-foreground", label: "Warning Foreground", category: "status"},
  {name: "--danger", label: "Danger", category: "status"},
  {name: "--danger-foreground", label: "Danger Foreground", category: "status"},

  // Field colors
  {name: "--field-background", label: "Field Background", category: "field"},
  {name: "--field-foreground", label: "Field Foreground", category: "field"},
  {name: "--field-placeholder", label: "Field Placeholder", category: "field"},

  // Border colors
  {name: "--border", label: "Border", category: "border"},
  {name: "--separator", label: "Separator", category: "border"},
  {name: "--focus", label: "Focus", category: "border"},
] as const;

export type ColorVariable = (typeof COLOR_VARIABLES)[number];
