/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

/**
 * HeroUI Core Plugin for Tailwind CSS v4
 */

import type {PluginAPI} from "tailwindcss/plugin";

import {Logger} from "@heroui/utils";
import plugin from "tailwindcss/plugin";

import * as base from "./dist/base";
import * as components from "./dist/components";
import {themes} from "./dist/themes";
import * as utilities from "./dist/utilities";
import {addPrefix} from "./functions/add-prefix";
import {handlePrereleaseWarning} from "./prerelease";
import {animationThemeValues} from "./src/utils/animations";

// Type definition for CSS-in-JS format expected by Tailwind
type CssInJs = {
  [key: string]: string | string[] | CssInJs | CssInJs[];
};

export interface PluginOptions {
  /**
   * Which theme to use
   * @default "default"
   * @example "default" | "glass" | false
   */
  theme?: string | false;
  /**
   * Whether to apply dark mode automatically with prefers-color-scheme
   * @default true
   */
  prefersDark?: boolean;
  /**
   * CSS selector for the root element
   * @default ":root"
   */
  root?: string;
  /**
   * Prefix for all HeroUI classes
   * @default ""
   * @example "heroui-"
   */
  prefix?: string;
  /**
   * List of components to include
   * @default [] (all components)
   * @example ["button", "card", "modal"]
   */
  include?: string;
  /**
   * List of components to exclude
   * @default []
   * @example ["table", "chart"]
   */
  exclude?: string;
  /**
   * Enable/disable console logs
   * @default false
   */
  logs?: boolean;
}

const heroUIPlugin = plugin.withOptions<PluginOptions>(
  function (options = {}) {
    return function ({addBase, addComponents, addUtilities}: PluginAPI) {
      const {
        exclude,
        include,
        logs = false,
        prefersDark = true,
        prefix = "",
        root = ":root",
        theme: selectedTheme = "default",
      } = options;

      const logger = new Logger({
        enabled: logs,
        prefix: "HeroUI",
      });

      // Handle prerelease warning and version info
      handlePrereleaseWarning(logger);

      logger.info("Initializing HeroUI plugin...");
      if (prefix) {
        logger.info(`Using prefix: ${prefix}`);
      }

      const shouldIncludeItem = (name: string) => {
        if (include && exclude) {
          return include.includes(name) && !exclude.includes(name);
        }
        if (include) {
          return include.includes(name);
        }
        if (exclude) {
          return !exclude.includes(name);
        }

        return true;
      };

      // Log include/exclude info
      if (include) {
        logger.info(`Including only: ${include}`);
      }
      if (exclude) {
        logger.info(`Excluding: ${exclude}`);
      }

      // Collect all base styles to merge them properly
      const baseStyles: Record<string, CssInJs> = {};

      // Helper function to merge styles for the same selector
      const mergeStyles = (target: Record<string, CssInJs>, source: Record<string, CssInJs>) => {
        Object.entries(source).forEach(([selector, styles]) => {
          if (target[selector]) {
            logger.debug(`Merging styles for selector: ${selector}`);
            // If selector already exists, merge the styles
            if (
              typeof styles === "object" &&
              !Array.isArray(styles) &&
              typeof target[selector] === "object" &&
              !Array.isArray(target[selector])
            ) {
              target[selector] = {...(target[selector] as CssInJs), ...(styles as CssInJs)};
            } else {
              // For non-object values, the later value wins
              logger.warn(`Overwriting non-object value for selector: ${selector}`);
              target[selector] = styles;
            }
          } else {
            target[selector] = styles;
          }
        });
      };

      // Process base styles
      Object.entries(base).forEach(([name, item]) => {
        logger.info(`[Base] Processing: ${name}`);
        if (!shouldIncludeItem(name)) {
          logger.info(`[Base] Skipping: ${name}`);

          return;
        }

        const prefixedBase = addPrefix(item as any, prefix) as unknown as Record<string, CssInJs>;

        mergeStyles(baseStyles, prefixedBase);

        logger.success(`[Base] Added to collection: ${name}`);
      });

      // Add dark mode custom variant
      mergeStyles(baseStyles, {
        "@custom-variant dark": {
          "&": "(&:where([data-theme=dark], [data-theme=dark] *, .dark, .dark *));",
        } as CssInJs,
      });

      Object.entries(components).forEach(([name, item]) => {
        logger.info(`[Component] Processing: ${name}`);
        if (!shouldIncludeItem(name)) {
          logger.info(`[Component] Skipping: ${name}`);

          return;
        }

        const prefixedComponent = addPrefix(item as any, prefix) as unknown as Record<
          string,
          CssInJs
        >;

        logger.info(`[Component] Adding: ${name}`);

        addComponents({...prefixedComponent});

        logger.success(`[Component] Added: ${name}`);

        logger.info(
          `[Component] Adding selectors: ${name}`,
          Object.keys(item).find((compSel) => name.startsWith(compSel)),
        );
      });

      Object.entries(utilities).forEach(([name, item]) => {
        logger.info(`[Utility] Processing: ${name}`);
        if (!shouldIncludeItem(name)) {
          logger.info(`[Utility] Skipping: ${name}`);

          return;
        }

        const prefixedUtilities = addPrefix(item as any, prefix) as unknown as Record<
          string,
          CssInJs
        >;

        logger.info(`[Utility] Adding: ${name}`);

        addUtilities({...prefixedUtilities});

        logger.success(`[Utility] Added: ${name}`);
      });

      // Apply themes
      logger.info(`🎨 [Theme] Configuration:`);

      if (selectedTheme === false) {
        logger.info(`  ⏭ [Theme] Disabled`);
      } else if (themes) {
        const availableThemes = Object.keys(themes);

        logger.info(`  [Theme] Available: ${availableThemes.join(", ")}`);

        const themeGroup = (themes as any)[selectedTheme];

        if (themeGroup) {
          logger.info(`  ✓ [Theme] Applying: ${selectedTheme}`);

          // Apply light theme to root
          if (themeGroup.light) {
            const lightVarCount = Object.keys(themeGroup.light).length;

            logger.debug(`    - [Theme] Light: ${lightVarCount} CSS variables`);

            // Merge light theme into baseStyles for root selector
            mergeStyles(baseStyles, {
              [root]: themeGroup.light,
            });
            logger.success(`    ✓ [Theme] Light added to ${root}`);
          } else {
            logger.warn(`    ⚠ [Theme] No light found for ${selectedTheme}`);
          }

          // Apply dark theme with proper selectors
          if (themeGroup.dark) {
            const darkVarCount = Object.keys(themeGroup.dark).length;

            logger.debug(`    - [Theme] Dark: ${darkVarCount} CSS variables`);

            // Apply to explicit dark mode selectors
            mergeStyles(baseStyles, {
              [`[data-theme="dark"]`]: themeGroup.dark,
              [`.dark`]: themeGroup.dark,
            });
            logger.success(`    ✓ [Theme] Dark added to [data-theme="dark"] and .dark`);

            // Apply dark theme for prefers-color-scheme if enabled
            if (prefersDark) {
              mergeStyles(baseStyles, {
                "@media (prefers-color-scheme: dark)": {
                  [`${root}:not([data-theme])`]: themeGroup.dark,
                },
              });
              logger.success(`    ✓ [Theme] Dark with prefers-color-scheme added`);
            } else {
              logger.debug(`    - [Theme] prefers-color-scheme disabled`);
            }
          } else {
            logger.warn(`    ⚠ [Theme] No dark found for ${selectedTheme}`);
          }
        } else {
          logger.warn(`  ⚠ [Theme] "${selectedTheme}" not found`);
          logger.info(`  [Theme] Available: ${availableThemes.join(", ")}`);
        }
      } else {
        logger.warn(`  ⚠ [Theme] No themes module found`);
      }

      // Apply all collected base styles at once
      logger.info("Applying all collected base styles...");
      if (Object.keys(baseStyles).length > 0) {
        addBase(baseStyles);
        logger.success(`Applied ${Object.keys(baseStyles).length} base style selectors`);
      }

      logger.success("\n🎉 HeroUI plugin initialized successfully!");
    };
  },
  function (options = {}) {
    const {prefix = ""} = options;
    const prefixVar = (name: string) => {
      // Don't prefix Tailwind's built-in variables or excluded ones
      if (name.startsWith("tw-") || name.startsWith("color-")) {
        return `var(--${name})`;
      }

      return prefix ? `var(--${prefix}${name})` : `var(--${name})`;
    };

    return {
      theme: {
        extend: {
          colors: {
            accent: {
              DEFAULT: prefixVar("accent"),
              foreground: prefixVar("accent-foreground"),
              hover: `color-mix(in oklab, ${prefixVar("accent")} 90%, ${prefixVar("accent-foreground")} 20%)`,
              soft: prefixVar("accent-soft"),
              "soft-foreground": prefixVar("accent-soft-foreground"),
              "soft-hover": `color-mix(in oklab, ${prefixVar("accent-soft")} 10%, ${prefixVar("accent-soft-foreground")} 18%)`,
            },
            background: prefixVar("background"),
            base: {
              DEFAULT: prefixVar("base"),
              foreground: prefixVar("base-foreground"),
              hover: `color-mix(in oklab, ${prefixVar("base")} 90%, ${prefixVar("base-foreground")} 5%)`,
            },
            border: prefixVar("border"),
            danger: {
              DEFAULT: prefixVar("danger"),
              foreground: prefixVar("danger-foreground"),
              hover: `color-mix(in oklab, ${prefixVar("danger")} 90%, ${prefixVar("danger-foreground")} 10%)`,
            },
            focus: prefixVar("focus"),
            foreground: prefixVar("foreground"),
            link: prefixVar("link"),
            muted: {
              DEFAULT: prefixVar("muted"),
              foreground: prefixVar("muted-foreground"),
            },
            panel: prefixVar("panel"),
            success: {
              DEFAULT: prefixVar("success"),
              foreground: prefixVar("success-foreground"),
              hover: `color-mix(in oklab, ${prefixVar("success")} 90%, ${prefixVar("success-foreground")} 10%)`,
            },
            surface: {
              1: prefixVar("surface-1"),
              2: prefixVar("surface-2"),
              3: prefixVar("surface-3"),
              DEFAULT: prefixVar("surface"),
              foreground: prefixVar("surface-foreground"),
            },
            warning: {
              DEFAULT: prefixVar("warning"),
              foreground: prefixVar("warning-foreground"),
              hover: `color-mix(in oklab, ${prefixVar("warning")} 90%, ${prefixVar("warning-foreground")} 10%)`,
            },
          },
          boxShadow: {
            border: prefixVar("shadow-border"),
          },
          cursor: {
            disabled: prefixVar("cursor-disabled"),
            interactive: prefixVar("cursor-interactive"),
          },
          // Spread animation theme values
          ...animationThemeValues,
        },
      },
    };
  },
);

export default heroUIPlugin;
