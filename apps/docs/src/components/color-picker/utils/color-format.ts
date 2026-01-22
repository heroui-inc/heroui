import type {ColorFormat} from "../types";
import type {Color} from "react-aria-components";

import {converter, formatCss, formatHsl, mapper, parse, parseOklch, round} from "culori";
import {parseColor} from "react-aria-components";

import {DEFAULT_COLOR_HSL} from "../constants";

/* -------------------------------------------------------------------------------------------------
 * Normalize Color Syntax
 * -----------------------------------------------------------------------------------------------*/

/**
 * Normalizes modern CSS color syntax (space-separated) to legacy syntax (comma-separated)
 * that parseColor from react-aria expects.
 *
 * @example
 * normalizeColorSyntax("hsl(220 70% 50%)") // → "hsl(220, 70%, 50%)"
 * normalizeColorSyntax("hsl(220 70% 50% / 0.5)") // → "hsla(220, 70%, 50%, 0.5)"
 * normalizeColorSyntax("rgb(255 128 0)") // → "rgb(255, 128, 0)"
 * normalizeColorSyntax("rgb(255 128 0 / 0.5)") // → "rgba(255, 128, 0, 0.5)"
 */
export function normalizeColorSyntax(color: string): string {
  const trimmed = color.trim();

  // Match hsl/hsla with space-separated values
  const hslMatch = trimmed.match(
    /^(hsla?)\s*\(\s*([^\s,]+)\s+([^\s,]+)\s+([^\s,/]+)(?:\s*\/\s*([^\s)]+))?\s*\)$/i,
  );

  if (hslMatch) {
    const [, func, h, s, l, a] = hslMatch;

    if (a !== undefined) {
      return `hsla(${h}, ${s}, ${l}, ${a})`;
    }

    return `${func}(${h}, ${s}, ${l})`;
  }

  // Match rgb/rgba with space-separated values
  const rgbMatch = trimmed.match(
    /^(rgba?)\s*\(\s*([^\s,]+)\s+([^\s,]+)\s+([^\s,/]+)(?:\s*\/\s*([^\s)]+))?\s*\)$/i,
  );

  if (rgbMatch) {
    const [, func, r, g, b, a] = rgbMatch;

    if (a !== undefined) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    return `${func}(${r}, ${g}, ${b})`;
  }

  // Match hsb/hsba with space-separated values
  const hsbMatch = trimmed.match(
    /^(hsba?)\s*\(\s*([^\s,]+)\s+([^\s,]+)\s+([^\s,/]+)(?:\s*\/\s*([^\s)]+))?\s*\)$/i,
  );

  if (hsbMatch) {
    const [, func, h, s, b, a] = hsbMatch;

    if (a !== undefined) {
      return `hsba(${h}, ${s}, ${b}, ${a})`;
    }

    return `${func}(${h}, ${s}, ${b})`;
  }

  return trimmed;
}

/* -------------------------------------------------------------------------------------------------
 * Detect Color Format
 * -----------------------------------------------------------------------------------------------*/

/**
 * Detects the color format from an input string.
 * Returns null if the format cannot be determined.
 */
export function detectColorFormat(value: string): ColorFormat | null {
  const trimmed = value.trim().toLowerCase();

  if (trimmed.startsWith("oklch(")) return "oklch";
  if (trimmed.startsWith("hsl(") || trimmed.startsWith("hsla(")) return "hsl";
  if (trimmed.startsWith("rgb(") || trimmed.startsWith("rgba(")) return "rgb";
  if (trimmed.startsWith("hsb(") || trimmed.startsWith("hsba(")) return "hsb";
  // Detect hex format (with or without #)
  if (/^#?[0-9a-f]{3,8}$/i.test(trimmed)) return "hex";

  return null;
}

/* -------------------------------------------------------------------------------------------------
 * Format Color
 * -----------------------------------------------------------------------------------------------*/

/**
 * Formats a Color object to a string in the specified format.
 * Handles OKLCH conversion using culori since react-aria doesn't support it natively.
 */
export function formatColor(color: Color, format: ColorFormat): string {
  if (format !== "oklch") {
    return color.toString(format);
  }

  const oklch = converter("oklch");
  const roundTo4 = round(4);
  const oklchColor = oklch(color.toString("css"));

  if (!oklchColor) {
    return color.toString("hex");
  }

  // Round each channel value
  const roundedColor = mapper(roundTo4, "oklch")(oklchColor);

  return formatCss(roundedColor);
}

export function getHueFromColor(color: Color): number {
  const oklch = converter("oklch")(color.toString("hsl"));

  if (!oklch || oklch.h === undefined) {
    return 0;
  }

  return oklch.h;
}

export function formatFromOklchToColor(oklch: string): Color {
  const oklchColor = parseOklch(oklch);

  if (!oklchColor) {
    return parseColor(DEFAULT_COLOR_HSL);
  }

  const hsl = formatHsl(oklchColor);

  return parseColor(hsl);
}

export const getValuesFromOklch = (
  hsl: string,
): {lightness: number; chroma: number; hue: number} => {
  const oklch = converter("oklch");
  const oklchColor = oklch(hsl);

  return {chroma: oklchColor?.c ?? 0, hue: oklchColor?.h ?? 0, lightness: oklchColor?.l ?? 0};
};

/* -------------------------------------------------------------------------------------------------
 * Validate Color Input
 * -----------------------------------------------------------------------------------------------*/

/**
 * Validates if a string is a valid color for the given format.
 * Returns the parsed Color if valid, null otherwise.
 */
export function validateColorInput(input: string, format: ColorFormat): Color | null {
  const trimmed = input.trim();

  if (!trimmed) return null;

  try {
    // Use culori to parse and validate the color
    const parsed = parse(trimmed);

    if (!parsed) return null;

    // For format-specific validation
    switch (format) {
      case "hex":
        // Accept hex colors (with or without #)
        if (/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(trimmed)) {
          const hexValue = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;

          return parseColor(hexValue);
        }

        return null;

      case "hsl":
        // Accept hsl/hsla format (both comma and space-separated)
        if (/^hsla?\s*\(/i.test(trimmed)) {
          const normalized = normalizeColorSyntax(trimmed);

          return parseColor(normalized);
        }

        return null;

      case "rgb":
        // Accept rgb/rgba format (both comma and space-separated)
        if (/^rgba?\s*\(/i.test(trimmed)) {
          const normalized = normalizeColorSyntax(trimmed);

          return parseColor(normalized);
        }

        return null;

      case "hsb":
        // Accept hsb/hsba format (both comma and space-separated)
        if (/^hsba?\s*\(/i.test(trimmed)) {
          const normalized = normalizeColorSyntax(trimmed);

          return parseColor(normalized);
        }

        return null;

      case "oklch":
        // Accept oklch format
        if (/^oklch\s*\(/i.test(trimmed)) {
          // Convert oklch to hsl for react-aria compatibility
          const hsl = formatHsl(trimmed);

          if (hsl) {
            return parseColor(hsl);
          }
        }

        return null;

      default:
        return null;
    }
  } catch {
    return null;
  }
}
