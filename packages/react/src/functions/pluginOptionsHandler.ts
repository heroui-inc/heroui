/**
 * Plugin options handler
 * Processes theme options and generates CSS rules
 */

import type {PluginAPI} from "tailwindcss/plugin";

// Type for CSS-in-JS objects that Tailwind accepts
export type CssInJs = {
  [key: string]: string | string[] | CssInJs | CssInJs[];
};

export interface PluginOptions {
  defaultTheme?: string;
  prefersDark?: string;
  prefix?: string;
  themes?: boolean | string[];
}

interface ThemesObject {
  [themeName: string]: CssInJs;
}

export function pluginOptionsHandler(
  options: PluginOptions = {},
  addBase: PluginAPI["addBase"],
  themesObject: ThemesObject,
): {prefix: string} {
  const {defaultTheme = "light", prefersDark = "dark", prefix = "", themes = true} = options;

  // If themes are disabled, return early
  if (!themes) {
    return {prefix};
  }

  // Get list of enabled themes
  let enabledThemes: string[] = [];

  if (themes === true) {
    // Use all available themes
    enabledThemes = Object.keys(themesObject);
  } else if (Array.isArray(themes)) {
    // Use specified themes
    enabledThemes = themes.filter((theme) => themesObject[theme]);
  }

  // Generate CSS rules for each theme
  const themeRules: CssInJs = {};

  // Add default theme to :root
  if (defaultTheme && themesObject[defaultTheme]) {
    themeRules[":root"] = themesObject[defaultTheme];
  }

  // Add each theme with data-theme selector
  enabledThemes.forEach((themeName) => {
    if (themeName === defaultTheme) return; // Skip default theme as it's already on :root

    const selector = `[data-theme="${themeName}"]`;
    const themeStyles = themesObject[themeName];

    if (themeStyles) {
      themeRules[selector] = themeStyles;
    }
  });

  // Add prefers-color-scheme support
  if (prefersDark && themesObject[prefersDark] && prefersDark !== defaultTheme) {
    themeRules["@media (prefers-color-scheme: dark)"] = {
      ":root:not([data-theme])": themesObject[prefersDark],
    };
  }

  // Apply theme rules
  addBase(themeRules);

  return {prefix};
}
