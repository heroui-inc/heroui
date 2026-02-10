import type {Color} from "react-aria-components";

import {formatHsl} from "culori";
import {parseColor} from "react-aria-components";

import {DEFAULT_COLOR} from "../constants";

/* -------------------------------------------------------------------------------------------------
 * Safe Color Parser
 * -----------------------------------------------------------------------------------------------*/

/**
 * Safely parses a color string or Color object into a Color object.
 * Handles OKLCH conversion since react-aria doesn't support it natively.
 * Falls back to DEFAULT_COLOR if parsing fails.
 */
export function safeParseColor(color: string | Color): Color {
  try {
    if (typeof color === "string") {
      if (color.startsWith("oklch")) {
        const hsl = formatHsl(color);

        if (!hsl) {
          return parseColor(DEFAULT_COLOR);
        }

        return parseColor(hsl);
      }

      return parseColor(color);
    }

    return color;
  } catch {
    return parseColor(DEFAULT_COLOR);
  }
}

/* -------------------------------------------------------------------------------------------------
 * Safe Default Value Parser
 * -----------------------------------------------------------------------------------------------*/

/**
 * Safely parses a default value for the color picker.
 * Handles unsupported color formats by falling back to DEFAULT_COLOR.
 */
export function parseSafeDefaultValue(defaultValue: string | Color | undefined): Color {
  if (!defaultValue) return parseColor(DEFAULT_COLOR);

  // If it's already a Color object, return as-is
  if (typeof defaultValue !== "string") return defaultValue;

  // Check for unsupported color formats (oklab, lab, lch, etc.)
  const unsupportedFormats = ["oklab", "lab(", "lch(", "color("];

  if (unsupportedFormats.some((format) => defaultValue.toLowerCase().startsWith(format))) {
    return parseColor(DEFAULT_COLOR);
  }

  return safeParseColor(defaultValue);
}
