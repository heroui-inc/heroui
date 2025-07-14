/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * HeroUI Plugin for Tailwind CSS v4
 * Main entry point for @plugin "@heroui/react/plugin"
 */

import type {CssInJs, PluginOptions} from "./functions/pluginOptionsHandler";

import {pluginOptionsHandler} from "./functions/pluginOptionsHandler";
import {base, components, utilities} from "./imports";

// Type for Tailwind CSS v4 plugin API
interface TailwindPluginAPI {
  addBase: (styles: CssInJs) => void;
  addComponents: (styles: CssInJs) => void;
  addUtilities: (styles: CssInJs) => void;
}

// Import themes - will be generated during build
import themesObject from "./themes/generated-object";

// Main plugin function
function heroUIPlugin(api: TailwindPluginAPI) {
  const {addBase, addComponents, addUtilities} = api;

  // Default options
  const options: PluginOptions = {
    defaultTheme: "light",
    prefersDark: "dark",
    themes: true,
  };

  // Handle theme options and apply theme CSS
  const {prefix = ""} = pluginOptionsHandler(options, addBase, themesObject);

  // Apply base styles
  Object.entries(base).forEach(([, item]) => {
    item({addBase, prefix} as any);
  });

  // Apply component styles
  Object.entries(components).forEach(([, item]) => {
    item({addComponents, prefix} as any);
  });

  // Apply utilities
  Object.entries(utilities).forEach(([, item]) => {
    item({addUtilities, addBase, prefix} as any);
  });

  // Add theme color utilities based on CSS variables
  const colorUtilities: Record<string, any> = {};

  // Generate utilities for theme CSS variables
  const colorNames = [
    "background",
    "foreground",
    "panel",
    "base",
    "base-foreground",
    "surface",
    "surface-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "accent-soft",
    "accent-soft-foreground",
    "success",
    "success-foreground",
    "warning",
    "warning-foreground",
    "danger",
    "danger-foreground",
    "border",
    "focus",
    "link",
  ];

  colorNames.forEach((name) => {
    colorUtilities[`.text-${name}`] = {color: `var(--${name})`};
    colorUtilities[`.bg-${name}`] = {backgroundColor: `var(--${name})`};
    colorUtilities[`.border-${name}`] = {borderColor: `var(--${name})`};
  });

  // Add surface level utilities
  for (let i = 1; i <= 3; i++) {
    colorUtilities[`.bg-surface-${i}`] = {backgroundColor: `var(--surface-${i})`};
  }

  // Add hover color utilities
  const interactiveColors = ["accent", "accent-soft"];

  interactiveColors.forEach((name) => {
    colorUtilities[`.bg-${name}-hover`] = {backgroundColor: `var(--${name}-hover)`};
  });

  // Add ring utilities for focus states
  colorUtilities[".ring-focus"] = {
    "--tw-ring-color": "var(--focus)",
  };

  // Add shadow utilities
  colorUtilities[".shadow-border"] = {
    boxShadow: "var(--shadow-border)",
  };

  addUtilities(colorUtilities);
}

// Export as default for @plugin directive
export default heroUIPlugin;

// CommonJS compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = heroUIPlugin;
  module.exports.default = heroUIPlugin;
}
