/**
 * CSS Variable Reader Utility
 * Reads CSS variable values from the DOM and resolves variable references
 */

import {parseOklch} from "./oklch-utils";

/**
 * Theme values structure matching DEFAULT_THEME_VALUES format
 */
export interface ThemeValues {
  background: {l: number; c: number; h: number};
  foreground: {l: number; c: number; h: number};
  surface: {l: number; c: number; h: number};
  overlay: {l: number; c: number; h: number};
  muted: {l: number; c: number; h: number};
  scrollbar: {l: number; c: number; h: number};
  default: {l: number; c: number; h: number};
  accent: {l: number; c: number; h: number};
  border: {l: number; c: number; h: number};
  separator: {l: number; c: number; h: number};
  segment: {l: number; c: number; h: number};
  success: {l: number; c: number; h: number};
  warning: {l: number; c: number; h: number};
  danger: {l: number; c: number; h: number};
}

/**
 * Read a CSS variable value from an element
 * Handles theme-specific selectors by reading from the appropriate element context
 */
export function readCssVariable(element: HTMLElement, variableName: string): string {
  // Get computed style from the element
  const computedStyle = getComputedStyle(element);
  const value = computedStyle.getPropertyValue(variableName).trim();

  return value;
}

/**
 * Resolve CSS variable references recursively
 * Handles var(--reference) by resolving to actual OKLCH values
 */
export function resolveCssVariable(
  element: HTMLElement,
  variableName: string,
  theme: "light" | "dark",
  visited: Set<string> = new Set(),
): string | null {
  // Prevent infinite loops
  if (visited.has(variableName)) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn(`Circular reference detected for CSS variable: ${variableName}`);
    }

    return null;
  }

  visited.add(variableName);

  const value = readCssVariable(element, variableName);

  if (!value) {
    return null;
  }

  // If it's a CSS variable reference, resolve it
  if (value.startsWith("var(")) {
    // Extract variable name from var(--name) or var(--name, fallback)
    const match = value.match(/var\(\s*([^,)]+)(?:\s*,\s*([^)]+))?\s*\)/);

    if (match) {
      const refVarName = match[1].trim();
      const fallback = match[2]?.trim();

      // Try to resolve the referenced variable
      const resolved = resolveCssVariable(element, refVarName, theme, visited);

      if (resolved) {
        return resolved;
      }

      // If resolution failed and there's a fallback, use it
      if (fallback) {
        // If fallback is another var(), resolve it
        if (fallback.startsWith("var(")) {
          return resolveCssVariable(element, fallback, theme, visited);
        }

        return fallback;
      }
    }

    return null;
  }

  // Return the resolved value (should be OKLCH or other CSS value)
  return value;
}

/**
 * Parse OKLCH value and convert to {l, c, h} format
 * Handles percentage format (12% -> 0.12) and decimal format (0.12 -> 0.12)
 */
function parseOklchToObject(value: string): {l: number; c: number; h: number} | null {
  const oklch = parseOklch(value);

  if (!oklch) {
    return null;
  }

  return {
    l: oklch.l,
    c: oklch.c,
    h: oklch.h,
  };
}

/**
 * Read default theme values from CSS variables in the DOM
 * Resolves all variable references and parses OKLCH values
 */
export function readDefaultThemeValues(
  element: HTMLElement,
  theme: "light" | "dark",
): ThemeValues | null {
  // Always use document.documentElement (html element) which has CSS variables defined
  // CSS variables are defined on :root, .light, [data-theme="light"], etc.
  // The html element should already have these classes/attributes applied
  const htmlElement = document.documentElement;

  // Temporarily ensure the correct theme is set on html element
  const originalClasses = htmlElement.className;
  const originalDataTheme = htmlElement.getAttribute("data-theme");

  // Set theme context on html element
  htmlElement.classList.remove("light", "dark", "default");
  htmlElement.classList.add(theme);
  htmlElement.setAttribute("data-theme", theme);

  // Force a reflow to ensure CSS is applied
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  htmlElement.offsetHeight;

  // Verify CSS variables are available by checking a primitive variable
  const testValue = getComputedStyle(htmlElement).getPropertyValue("--white").trim();

  if (!testValue && process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.warn(
      "CSS variables may not be loaded. Check that @packages/styles CSS files are imported.",
    );
  }

  try {
    // Read all required CSS variables from the html element
    const backgroundValue = resolveCssVariable(htmlElement, "--background", theme);
    const foregroundValue = resolveCssVariable(htmlElement, "--foreground", theme);
    const surfaceValue = resolveCssVariable(htmlElement, "--surface", theme);
    const overlayValue = resolveCssVariable(htmlElement, "--overlay", theme);
    const mutedValue = resolveCssVariable(htmlElement, "--muted", theme);
    const scrollbarValue = resolveCssVariable(htmlElement, "--scrollbar", theme);
    const defaultValue = resolveCssVariable(htmlElement, "--default", theme);
    const accentValue = resolveCssVariable(htmlElement, "--accent", theme);
    const borderValue = resolveCssVariable(htmlElement, "--border", theme);
    const separatorValue = resolveCssVariable(htmlElement, "--separator", theme);
    const segmentValue = resolveCssVariable(htmlElement, "--segment", theme);
    const successValue = resolveCssVariable(htmlElement, "--success", theme);
    const warningValue = resolveCssVariable(htmlElement, "--warning", theme);
    const dangerValue = resolveCssVariable(htmlElement, "--danger", theme);

    // Parse all values to OKLCH objects
    const background = backgroundValue ? parseOklchToObject(backgroundValue) : null;
    const foreground = foregroundValue ? parseOklchToObject(foregroundValue) : null;
    const surface = surfaceValue ? parseOklchToObject(surfaceValue) : null;
    const overlay = overlayValue ? parseOklchToObject(overlayValue) : null;
    const muted = mutedValue ? parseOklchToObject(mutedValue) : null;
    const scrollbar = scrollbarValue ? parseOklchToObject(scrollbarValue) : null;
    const defaultColor = defaultValue ? parseOklchToObject(defaultValue) : null;
    const accent = accentValue ? parseOklchToObject(accentValue) : null;
    const border = borderValue ? parseOklchToObject(borderValue) : null;
    const separator = separatorValue ? parseOklchToObject(separatorValue) : null;
    const segment = segmentValue ? parseOklchToObject(segmentValue) : null;
    const success = successValue ? parseOklchToObject(successValue) : null;
    const warning = warningValue ? parseOklchToObject(warningValue) : null;
    const danger = dangerValue ? parseOklchToObject(dangerValue) : null;

    // Check if all required values were successfully parsed
    if (
      !background ||
      !foreground ||
      !surface ||
      !overlay ||
      !muted ||
      !scrollbar ||
      !defaultColor ||
      !accent ||
      !border ||
      !separator ||
      !segment ||
      !success ||
      !warning ||
      !danger
    ) {
      // Collect missing values for better error reporting
      const missing: string[] = [];
      const rawValues: Record<string, string | null> = {};

      if (!background) missing.push("--background");
      if (!foreground) missing.push("--foreground");
      if (!surface) missing.push("--surface");
      if (!overlay) missing.push("--overlay");
      if (!muted) missing.push("--muted");
      if (!scrollbar) missing.push("--scrollbar");
      if (!defaultColor) missing.push("--default");
      if (!accent) missing.push("--accent");
      if (!border) missing.push("--border");
      if (!separator) missing.push("--separator");
      if (!segment) missing.push("--segment");
      if (!success) missing.push("--success");
      if (!warning) missing.push("--warning");
      if (!danger) missing.push("--danger");

      // Get raw values for debugging
      rawValues["--background"] = backgroundValue;
      rawValues["--foreground"] = foregroundValue;
      rawValues["--surface"] = surfaceValue;
      rawValues["--overlay"] = overlayValue;
      rawValues["--muted"] = mutedValue;
      rawValues["--scrollbar"] = scrollbarValue;
      rawValues["--default"] = defaultValue;
      rawValues["--accent"] = accentValue;
      rawValues["--border"] = borderValue;
      rawValues["--separator"] = separatorValue;
      rawValues["--segment"] = segmentValue;
      rawValues["--success"] = successValue;
      rawValues["--warning"] = warningValue;
      rawValues["--danger"] = dangerValue;

      // Check if primitive variables are available (they should always be available)
      const whiteValue = resolveCssVariable(htmlElement, "--white", theme);
      const eclipseValue = resolveCssVariable(htmlElement, "--eclipse", theme);
      const snowValue = resolveCssVariable(htmlElement, "--snow", theme);

      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn("Failed to parse some CSS variables. Missing values:", {
          missing,
          rawValues,
          theme,
          htmlElementClasses: htmlElement.className,
          htmlElementDataTheme: htmlElement.getAttribute("data-theme"),
          primitiveVariables: {
            "--white": whiteValue,
            "--eclipse": eclipseValue,
            "--snow": snowValue,
          },
        });
      }

      return null;
    }

    return {
      background,
      foreground,
      surface,
      overlay,
      muted,
      scrollbar,
      default: defaultColor,
      accent,
      border,
      separator,
      segment,
      success,
      warning,
      danger,
    };
  } finally {
    // Restore original classes and data-theme on html element
    htmlElement.className = originalClasses;
    if (originalDataTheme) {
      htmlElement.setAttribute("data-theme", originalDataTheme);
    } else {
      htmlElement.removeAttribute("data-theme");
    }
  }
}
