"use client";

import {useIsSSR} from "@react-aria/ssr";
import * as React from "react";

// Cache for CSS variable values to avoid repeated DOM queries
const cssVariableCache = new Map<string, string | undefined>();

/**
 * A hook that safely retrieves CSS custom property values from the document element
 * with SSR support, automatic fallback handling, and optional caching.
 *
 * @example
 * ```jsx
 * function Component() {
 *   const animationType = useCSSVariable('--skeleton-default-animation-type')
 *   // Returns the CSS variable value or undefined (cached by default)
 * }
 * ```
 *
 * @example
 * ```jsx
 * function Component({ color }) {
 *   // Override with prop if provided
 *   const themeColor = useCSSVariable('--theme-color', color)
 *   // Returns color prop if defined, otherwise CSS variable value
 * }
 * ```
 *
 * @example
 * ```jsx
 * function Component() {
 *   // Disable caching for dynamic CSS variables
 *   const dynamicValue = useCSSVariable('--dynamic-value', undefined, false)
 *   // Will always query the DOM for fresh value
 * }
 * ```
 *
 * @param variableName - The CSS custom property name (e.g., '--my-variable')
 * @param override - Optional override value that takes precedence over CSS variable
 * @param cache - Whether to cache the CSS variable value (default: true)
 * @returns The CSS variable value, override value, or undefined
 */
export function useCSSVariable(
  variableName: string,
  override?: string,
  cache: boolean = true,
): string | undefined {
  const isSSR = useIsSSR();

  return React.useMemo(() => {
    // Return override if provided
    if (override !== undefined) return override;

    // Return undefined during SSR
    if (isSSR) return undefined;

    // Check cache first if caching is enabled
    if (cache && cssVariableCache.has(variableName)) {
      return cssVariableCache.get(variableName);
    }

    try {
      const root = document.documentElement;
      const value = getComputedStyle(root).getPropertyValue(variableName).trim() || undefined;

      // Cache the value if caching is enabled
      if (cache) {
        cssVariableCache.set(variableName, value);
      }

      return value;
    } catch {
      // Return undefined if any error occurs (e.g., document not available)
      return undefined;
    }
  }, [variableName, override, isSSR, cache]);
}
