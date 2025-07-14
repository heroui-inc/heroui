/* eslint-disable no-console */
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

/**
 * Loads theme definitions from the source file
 */
async function loadThemes() {
  const themePath = path.join(rootDir, "src/theme/default-themes.ts");
  const themeContent = await fs.readFile(themePath, "utf8");

  // Extract themes object from the file
  const themesMatch = themeContent.match(/export const themes = ({[\s\S]*});/);

  if (!themesMatch) {
    throw new Error("Could not find themes export in default-themes.ts");
  }

  // Parse the themes object (simplified - in production you'd use a proper parser)
  // For now, we'll manually extract the theme structure
  const lightTheme = {
    "--background": "oklch(100% 0 0)",
    "--foreground": "oklch(14.48% 0 0)",
    "--panel": "oklch(100% 0 0)",
    "--accent": "oklch(0.14 0 0)",
    "--accent-foreground": "oklch(0.99 0 0)",
    "--accent-hover": "oklch(0.2 0 0)",
    "--accent-soft": "var(--color-neutral-200)",
    "--accent-soft-foreground": "var(--color-neutral-700)",
    "--accent-soft-hover": "var(--color-neutral-300)",
    "--success": "oklch(0.55 0.1241 153.51)",
    "--success-foreground": "oklch(99.11% 0 0)",
    "--warning": "oklch(0.67 0.1428 72.73)",
    "--warning-foreground": "oklch(99.11% 0 0)",
    "--danger": "oklch(0.59 0.2228 29.94)",
    "--danger-foreground": "oklch(99.11% 0 0)",
    "--muted": "var(--color-neutral-500)",
    "--muted-foreground": "var(--color-neutral-400)",
    "--surface": "var(--color-neutral-100)",
    "--surface-foreground": "var(--foreground)",
    "--base": "var(--color-neutral-50)",
    "--base-foreground": "var(--color-neutral-600)",
    "--border": "oklch(0 0 0 / 15%)",
    "--focus": "oklch(0% 0 0 / 20%)",
    "--link": "var(--foreground)",
    "--scrollbar": "var(--color-neutral-300)",
    "--surface-1": "oklch(100% 0 0)",
    "--surface-2": "var(--color-neutral-50)",
    "--surface-3": "var(--color-neutral-100)",
    "--shadow-border":
      "0 0px 5px 0px rgba(0, 0, 0, 0.02), 0 2px 10px 0px rgba(0, 0, 0, 0.06), 0 0px 1px 0px rgba(0, 0, 0, 0.3)",
  };

  const darkTheme = {
    "--background": "oklch(0% 0 0)",
    "--foreground": "oklch(99.11% 0 0)",
    "--panel": "oklch(0.22 0 0)",
    "--accent": "oklch(0.99 0 0)",
    "--accent-foreground": "oklch(0.22 0 0)",
    "--accent-hover": "oklch(0.9 0 0)",
    "--accent-soft": "var(--color-neutral-800)",
    "--accent-soft-foreground": "var(--color-neutral-200)",
    "--accent-soft-hover": "var(--color-neutral-700)",
    "--success": "oklch(0.8 0.1561 154)",
    "--success-foreground": "oklch(0.1 0.02 0)",
    "--warning": "oklch(0.85 0.1414 77.88)",
    "--warning-foreground": "oklch(0.1 0.02 0)",
    "--danger": "oklch(0.61 0.1998 29.94)",
    "--danger-foreground": "oklch(0.99 0 0)",
    "--muted": "var(--color-neutral-300)",
    "--muted-foreground": "var(--color-neutral-400)",
    "--surface": "var(--color-neutral-900)",
    "--surface-foreground": "var(--color-neutral-200)",
    "--base": "var(--color-neutral-900)",
    "--base-foreground": "var(--color-neutral-200)",
    "--border": "oklch(1 0 0 / 12%)",
    "--focus": "oklch(100% 0 0 / 50%)",
    "--link": "var(--foreground)",
    "--scrollbar": "var(--color-neutral-800)",
    "--surface-1": "oklch(0.22 0 0)",
    "--surface-2": "var(--color-neutral-900)",
    "--surface-3": "var(--color-neutral-800)",
    "--shadow-border":
      "0 0 5px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.2), inset 0 0 1px rgba(255, 255, 255, 0.2)",
  };

  return {
    light: lightTheme,
    dark: darkTheme,
    "light-glass": {
      ...lightTheme,
      "--background": "oklch(100% 0 0 / 60%)",
      "--panel": "oklch(100% 0 0 / 70%)",
      "--surface": "oklch(100% 0 0 / 40%)",
      "--base": "oklch(100% 0 0 / 50%)",
      "--accent": "oklch(0.14 0 0 / 90%)",
      "--accent-soft": "oklch(0 0 0 / 8%)",
      "--surface-1": "oklch(100% 0 0 / 60%)",
      "--surface-2": "oklch(100% 0 0 / 50%)",
      "--surface-3": "oklch(100% 0 0 / 40%)",
      "--border": "oklch(0 0 0 / 10%)",
      "--blur": "10px",
      "--blur-soft": "5px",
      "--blur-strong": "20px",
    },
    "dark-glass": {
      ...darkTheme,
      "--background": "oklch(0% 0 0 / 60%)",
      "--panel": "oklch(0% 0 0 / 70%)",
      "--surface": "oklch(0% 0 0 / 40%)",
      "--base": "oklch(0% 0 0 / 50%)",
      "--accent": "oklch(0.99 0 0 / 90%)",
      "--accent-soft": "oklch(100% 0 0 / 8%)",
      "--surface-1": "oklch(0% 0 0 / 60%)",
      "--surface-2": "oklch(0% 0 0 / 50%)",
      "--surface-3": "oklch(0% 0 0 / 40%)",
      "--border": "oklch(100% 0 0 / 10%)",
      "--blur": "10px",
      "--blur-soft": "5px",
      "--blur-strong": "20px",
    },
  };
}

/**
 * Converts a theme object to CSS variables string
 */
function themeToCssVariables(theme, indent = "  ") {
  return Object.entries(theme)
    .filter(([key]) => key.startsWith("--"))
    .map(([key, value]) => `${indent}${key}: ${value};`)
    .join("\n");
}

/**
 * Generates the complete themes CSS content
 */
function generateThemesCss(themes) {
  const cssContent = [];

  // Add file header
  cssContent.push(`/**
 * HeroUI v3 Theme Variables
 * Auto-generated - DO NOT EDIT
 * 
 * This file contains all theme CSS variables for HeroUI components.
 * You can override any of these variables in your own CSS to customize the theme.
 */`);
  cssContent.push("");

  // Generate :root with light theme as default
  cssContent.push("/* Default theme (light) */");
  cssContent.push(":root {");
  cssContent.push(themeToCssVariables(themes.light));
  cssContent.push("}");
  cssContent.push("");

  // Generate theme-specific selectors
  Object.entries(themes).forEach(([themeName, themeVars]) => {
    if (themeName === "light") return; // Already added to :root

    cssContent.push(
      `/* ${themeName.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} theme */`,
    );
    cssContent.push(`[data-theme="${themeName}"] {`);
    cssContent.push(themeToCssVariables(themeVars));
    cssContent.push("}");
    cssContent.push("");
  });

  // Add dark mode support
  cssContent.push("/* Automatic dark mode support */");
  cssContent.push("@media (prefers-color-scheme: dark) {");
  cssContent.push("  :root:not([data-theme]) {");
  cssContent.push(themeToCssVariables(themes.dark, "    "));
  cssContent.push("  }");
  cssContent.push("}");

  return cssContent.join("\n");
}

/**
 * Generates the themes object for runtime use
 */
function generateThemesObject(themes) {
  const content = [
    `/**
 * HeroUI v3 Themes Object
 * Auto-generated - DO NOT EDIT
 */

import type {CssInJs} from "../functions/pluginOptionsHandler";

// Theme definitions
const themes = ${JSON.stringify(themes, null, 2)};

// Convert theme objects to CSS variables format
function convertThemeToCss(theme: Record<string, string>): CssInJs {
  const cssVars: CssInJs = {};
  
  Object.entries(theme).forEach(([key, value]) => {
    cssVars[key] = value;
  });
  
  return cssVars;
}

// Export themes in plugin format
const themesObject: Record<string, CssInJs> = {
  light: convertThemeToCss(themes.light),
  dark: convertThemeToCss(themes.dark),
  "light-glass": convertThemeToCss(themes["light-glass"]),
  "dark-glass": convertThemeToCss(themes["dark-glass"]),
};

export default themesObject;
`,
  ];

  return content.join("\n");
}

async function generateThemes() {
  console.log("🎨 Generating theme files...");

  try {
    // Load themes
    const themes = await loadThemes();

    // Generate themes CSS file
    const themeCssPath = path.join(rootDir, "dist", "theme-vars.css");

    await fs.ensureDir(path.dirname(themeCssPath));
    await fs.writeFile(themeCssPath, generateThemesCss(themes));
    console.log("✅ Generated theme-vars.css");

    // Generate themes object
    const themesObjectPath = path.join(rootDir, "src", "themes", "generated-object.ts");

    await fs.ensureDir(path.dirname(themesObjectPath));
    await fs.writeFile(themesObjectPath, generateThemesObject(themes));
    console.log("✅ Generated themes object");

    console.log("✨ Theme generation completed!");
  } catch (error) {
    console.error("❌ Theme generation failed:", error);
    throw error;
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateThemes().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export {generateThemes};
