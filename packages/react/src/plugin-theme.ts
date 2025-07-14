/**
 * HeroUI Theme Customization Plugin for Tailwind CSS v4
 * Allows customizing a specific theme with CSS variables
 */

import type {CssInJs} from "./functions/pluginOptionsHandler";

// Type for theme configuration
interface ThemeConfig {
  name?: string;
  default?: boolean;
  prefersDark?: boolean;
  [key: `--${string}`]: string | boolean | undefined; // CSS variables
}

// Type for Tailwind CSS v4 plugin API
interface TailwindPluginAPI {
  addBase: (styles: CssInJs) => void;
}

// Theme customization plugin
function heroUIThemePlugin(api: TailwindPluginAPI, options: ThemeConfig = {}) {
  const {addBase} = api;

  // Extract theme configuration
  const {
    default: isDefault = false,
    name = "custom",
    prefersDark = false,
    ...cssVariables
  } = options;

  // Build CSS variables object
  const themeVars: CssInJs = {};

  // Add all CSS variables (those starting with --)
  Object.entries(cssVariables).forEach(([key, value]) => {
    if (key.startsWith("--") && typeof value === "string") {
      themeVars[key] = value;
    }
  });

  // If no CSS variables provided, return early
  if (Object.keys(themeVars).length === 0) {
    return;
  }

  // Build the CSS rules
  const rules: CssInJs = {};

  // Apply to :root if it's the default theme
  if (isDefault) {
    rules[":root"] = themeVars;
  }

  // Always apply to data-theme selector
  rules[`[data-theme="${name}"]`] = themeVars;

  // Add prefers-dark support if requested
  if (prefersDark) {
    rules["@media (prefers-color-scheme: dark)"] = {
      ":root:not([data-theme])": themeVars,
    };
  }

  // Apply the theme rules
  addBase(rules);
}

// Export as default for @plugin directive
export default heroUIThemePlugin;
