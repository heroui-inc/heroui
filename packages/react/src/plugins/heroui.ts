/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * HeroUI Plugin for Tailwind CSS v4
 * Main entry point for @plugin "@heroui/react/plugin"
 */

import type {PluginAPI} from "tailwindcss/plugin";

import plugin from "tailwindcss/plugin";

import {animationThemeValues, setupAnimations} from "./animate";

// Type for CSS-in-JS objects that Tailwind accepts
type CssInJs = {
  [key: string]: string | string[] | CssInJs | CssInJs[];
};

interface ParsedTheme {
  name: string;
  isDefault?: boolean;
  isPrefersDark?: boolean;
}

interface PluginOptions {
  // For selecting built-in themes
  themes?: string | false | "all";
  prefix?: string;
  // For creating custom themes (legacy mode)
  name?: string;
  default?: boolean;
  prefersdark?: boolean;
  colorScheme?: "light" | "dark";
  [key: string]: any; // For CSS variables
}

// Default theme definitions
const defaultThemes = {
  light: {
    /* Base Colors */
    "--background": "oklch(100% 0 0)",
    "--foreground": "oklch(14.48% 0 0)",
    "--panel": "oklch(100% 0 0)",

    "--muted": "var(--color-neutral-500)",
    "--muted-foreground": "var(--color-neutral-400)",

    "--surface": "var(--color-neutral-100)",
    "--surface-foreground": "var(--foreground)",

    "--scrollbar": "var(--color-neutral-300)",

    "--base": "var(--color-neutral-50)",
    "--base-foreground": "var(--color-neutral-600)",

    "--accent": "oklch(0.14 0 0)",
    "--accent-foreground": "oklch(0.99 0 0)",

    "--accent-soft": "var(--color-neutral-200)",
    "--accent-soft-foreground": "var(--color-neutral-700)",

    /* Status Colors */
    "--success": "oklch(0.55 0.1241 153.51)",
    "--success-foreground": "oklch(99.11% 0 0)",

    "--warning": "oklch(0.67 0.1428 72.73)",
    "--warning-foreground": "oklch(99.11% 0 0)",

    "--danger": "oklch(0.59 0.2228 29.94)",
    "--danger-foreground": "oklch(99.11% 0 0)",

    /* Misc Colors */
    "--border": "oklch(0 0 0 / 15%)",
    "--focus": "oklch(0% 0 0 / 20%)",
    "--link": "var(--foreground)",

    /* Shadow */
    "--shadow-border":
      "0 0px 5px 0px rgba(0, 0, 0, 0.02), 0 2px 10px 0px rgba(0, 0, 0, 0.06), 0 0px 1px 0px rgba(0, 0, 0, 0.3)",
  },
  dark: {
    /* Base Colors */
    "--background": "oklch(0% 0 0)",
    "--foreground": "oklch(99.11% 0 0)",
    "--panel": "oklch(0.22 0 0)",

    "--muted": "var(--color-neutral-300)",
    "--muted-foreground": "var(--color-neutral-400)",

    "--surface": "var(--color-neutral-900)",
    "--surface-foreground": "var(--color-neutral-200)",

    "--scrollbar": "var(--color-neutral-800)",

    "--base": "var(--color-neutral-900)",
    "--base-foreground": "var(--color-neutral-200)",

    "--accent": "oklch(0.99 0 0)",
    "--accent-foreground": "oklch(0.22 0 0)",

    "--accent-soft": "var(--color-neutral-800)",
    "--accent-soft-foreground": "var(--color-neutral-200)",

    /* Status Colors */
    "--success": "oklch(0.8 0.1561 154)",
    "--success-foreground": "oklch(0.1 0.02 0)",

    "--warning": "oklch(0.85 0.1414 77.88)",
    "--warning-foreground": "oklch(0.1 0.02 0)",

    "--danger": "oklch(0.61 0.1998 29.94)",
    "--danger-foreground": "oklch(0.99 0 0)",

    /* Misc Colors */
    "--border": "oklch(1 0 0 / 12%)",
    "--focus": "oklch(100% 0 0 / 50%)",
    "--link": "var(--foreground)",

    /* Shadow */
    "--shadow-border":
      "0 0 5px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.2), inset 0 0 1px rgba(255, 255, 255, 0.2)",
  },
};

// Parse theme string like "light --default, dark --prefersdark, cupcake"
function parseThemes(themesOption: string | false | "all" | undefined): ParsedTheme[] {
  if (themesOption === false || themesOption === undefined || !themesOption) return [];
  if (themesOption === "all") {
    return Object.keys(defaultThemes).map((name) => ({name}));
  }

  const themes = themesOption.split(",").map((themeStr) => {
    const parts = themeStr.trim().split(/\s+/);
    const theme: ParsedTheme = {name: parts[0] || ""};

    if (parts.includes("--default")) {
      theme.isDefault = true;
    }
    if (parts.includes("--prefersdark")) {
      theme.isPrefersDark = true;
    }

    return theme;
  });

  return themes;
}

const heroUI = plugin.withOptions(
  function (options: PluginOptions = {}) {
    return function ({addBase, addUtilities, addVariant, matchUtilities, theme}: PluginAPI) {
      // Check if this is a custom theme creation
      if (options.name) {
        // Custom theme mode
        const {
          colorScheme = "light",
          default: isDefault = false,
          name,
          prefersdark: isPrefersDark = false,
          prefix: _prefix, // ignore this in custom mode
          themes: _themes, // ignore this in custom mode
          ...cssVariables
        } = options;

        // Convert the CSS variables to proper format
        const themeVars: CssInJs = {};

        // Process all CSS variables
        Object.entries(cssVariables).forEach(([key, value]) => {
          if (key.startsWith("--")) {
            themeVars[key] = value;
          }
        });

        // Apply theme based on settings
        const themeRules: CssInJs = {};

        if (isDefault) {
          // Default theme goes to :root
          themeRules[":root"] = {
            "color-scheme": colorScheme,
            ...themeVars,
          };
        }

        // Always add data-theme selector
        themeRules[`[data-theme="${name}"]`] = {
          "color-scheme": colorScheme,
          ...themeVars,
        };

        // Add prefers-color-scheme support if needed
        if (isPrefersDark && !isDefault) {
          themeRules["@media (prefers-color-scheme: dark)"] = {
            ":root:not([data-theme])": {
              "color-scheme": colorScheme,
              ...themeVars,
            },
          };
        }

        addBase(themeRules);

        return; // Exit early for custom theme mode
      }

      // Default plugin mode
      // prefix = "",
      const {themes = "light --default, dark --prefersdark"} = options;

      // Parse themes
      const parsedThemes = parseThemes(themes);
      const defaultTheme = parsedThemes.find((t) => t.isDefault);
      const prefersDarkTheme = parsedThemes.find((t) => t.isPrefersDark);

      // Base styles
      addBase({
        ":root": {
          // Layout tokens
          "--border-width": "1px",
          "--disabled-opacity": "0.5",
          "--radius": "0.75rem",
          "--radius-panel": "0.5rem",
          "--radius-panel-inner": "calc(var(--radius-panel) * 0.5)",
          // Typography
          "--font-size-base": "1rem", // Base font size (16px by default)
          "--font-size-scale-desktop": "0.875", // Desktop scale factor (14px when base is 16px)
        },
        // Universal base styles
        "*": {
          "scrollbar-width": "thin",
          "scrollbar-color": "var(--scrollbar) transparent",
        },

        "*, ::after, ::before, ::backdrop, ::file-selector-button": {
          "border-color": "var(--border, currentColor)",
        },

        "*, ::after, ::before": {
          "font-feature-settings": '"cv11", "ss01"',
          "font-variation-settings": '"opsz" 850',
          "text-rendering": "optimizeLegibility",
          "font-synthesis-weight": "none",
        },
        body: {
          "background-color": "var(--background)",
          color: "var(--foreground)",
          // Mobile: use base font size directly (16px by default)
          "font-size": "var(--font-size-base)",
        },
        "@media (min-width: 768px)": {
          body: {
            // Desktop: scale down the base font size (14px when base is 16px)
            "font-size": "calc(var(--font-size-base) * var(--font-size-scale-desktop))",
          },
        },
        // Allows set dark mode using "class" or "data-theme" attribute
        // See @https://tailwindcss.com/docs/dark-mode
        "@custom-variant dark": "(&:where([data-theme=dark], [data-theme=dark] *, .dark, .dark *))",
      });

      // Apply themes
      if (parsedThemes.length > 0) {
        const themeRules: CssInJs = {};

        // Add default theme to :root
        if (defaultTheme && defaultThemes[defaultTheme.name as keyof typeof defaultThemes]) {
          Object.assign(
            (themeRules[":root"] = themeRules[":root"] || {}),
            defaultThemes[defaultTheme.name as keyof typeof defaultThemes],
          );
        }

        // Add each theme with data-theme selector
        parsedThemes.forEach(({name}) => {
          if (name === defaultTheme?.name) return; // Skip default theme as it's already on :root

          const selector = `[data-theme="${name}"]`;
          const themeStyles = defaultThemes[name as keyof typeof defaultThemes];

          if (themeStyles) {
            themeRules[selector] = themeStyles;
          }
        });

        // Add prefers-color-scheme support
        if (
          prefersDarkTheme &&
          defaultThemes[prefersDarkTheme.name as keyof typeof defaultThemes] &&
          prefersDarkTheme.name !== defaultTheme?.name
        ) {
          themeRules["@media (prefers-color-scheme: dark)"] = {
            ":root:not([data-theme])":
              defaultThemes[prefersDarkTheme.name as keyof typeof defaultThemes],
          };
        }

        // Apply theme rules
        addBase(themeRules);
      }

      // Add animation-off variant (similar to motion-reduce but based on animation-off attribute)
      // e.g. <body data-animation-off>...</body>
      addVariant("animation-off", "[data-animation-off] *, [data-animation-off]");

      // Setup animation utilities
      setupAnimations({addUtilities, matchUtilities, theme});
    };
  },
  function (_options) {
    // Default theme configuration
    return {
      theme: {
        extend: {
          colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            panel: "var(--panel)",
            muted: {
              DEFAULT: "var(--muted)",
              foreground: "var(--muted-foreground)",
            },
            surface: {
              DEFAULT: "var(--surface)",
              foreground: "var(--surface-foreground)",
              1: "var(--surface-1)",
              2: "var(--surface-2)",
              3: "var(--surface-3)",
            },
            accent: {
              DEFAULT: "var(--accent)",
              foreground: "var(--accent-foreground)",
              soft: "var(--accent-soft)",
              "soft-foreground": "var(--accent-soft-foreground)",
              hover: "color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 20%)",
              "soft-hover":
                "color-mix(in oklab, var(--accent-soft) 10%, var(--accent-soft-foreground) 18%)",
            },
            base: {
              DEFAULT: "var(--base)",
              foreground: "var(--base-foreground)",
              hover: "color-mix(in oklab, var(--base) 90%, var(--base-foreground) 5%)",
            },
            success: {
              DEFAULT: "var(--success)",
              foreground: "var(--success-foreground)",
              hover: "color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%)",
            },
            warning: {
              DEFAULT: "var(--warning)",
              foreground: "var(--warning-foreground)",
              hover: "color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%)",
            },
            danger: {
              DEFAULT: "var(--danger)",
              foreground: "var(--danger-foreground)",
              hover: "color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%)",
            },
            border: "var(--border)",
            focus: "var(--focus)",
            link: "var(--link)",
          },
          borderRadius: {
            xs: "calc(var(--radius) * 0.25)",
            sm: "calc(var(--radius) * 0.5)",
            md: "calc(var(--radius) * 0.75)",
            lg: "calc(var(--radius) * 1)",
            xl: "calc(var(--radius) * 1.5)",
            "2xl": "calc(var(--radius) * 2)",
            "3xl": "calc(var(--radius) * 3)",
            "4xl": "calc(var(--radius) * 4)",
          },
          boxShadow: {
            border: "var(--shadow-border)",
          },
          // Spread animation theme values
          ...animationThemeValues,
        },
      },
    };
  },
);

// Export as default for @plugin directive
export default heroUI;
