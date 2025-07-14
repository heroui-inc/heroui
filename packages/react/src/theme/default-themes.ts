/**
 * Default themes for HeroUI
 * Based on Figma design tokens
 */

// Shared tokens across themes
const sharedTokens = {
  // Layout
  "--border-width": "1px",
  "--disabled-opacity": "0.5",
  // Radius
  "--radius": "0.75rem",
  "--radius-panel": "0.5rem",
  "--radius-panel-inner": "calc(var(--radius-panel) * 0.5)",
  // Font
  "--font-size-base": "clamp(14px, 1vw + 0.5rem, 16px)",
};

// Light theme tokens
const lightTheme = {
  ...sharedTokens,
  // Base Colors
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
  // Surface Levels
  "--surface-1": "oklch(100% 0 0)",
  "--surface-2": "var(--color-neutral-50)",
  "--surface-3": "var(--color-neutral-100)",
  // Status Colors
  "--success": "oklch(0.55 0.1241 153.51)",
  "--success-foreground": "oklch(99.11% 0 0)",
  "--warning": "oklch(0.67 0.1428 72.73)",
  "--warning-foreground": "oklch(99.11% 0 0)",
  "--danger": "oklch(0.59 0.2228 29.94)",
  "--danger-foreground": "oklch(99.11% 0 0)",
  // Misc Colors
  "--border": "oklch(0 0 0 / 15%)",
  "--focus": "oklch(0% 0 0 / 20%)",
  "--link": "var(--foreground)",
  // Shadow
  "--shadow-border":
    "0 0px 5px 0px rgba(0, 0, 0, 0.02), 0 2px 10px 0px rgba(0, 0, 0, 0.06), 0 0px 1px 0px rgba(0, 0, 0, 0.3)",
  // Glass effects
  "--blur": "0px",
  "--blur-soft": "0px",
  "--blur-strong": "0px",
  "--depth": "0",
};

// Dark theme tokens
const darkTheme = {
  ...sharedTokens,
  // Base Colors
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
  // Surface Levels
  "--surface-1": "oklch(0.22 0 0)",
  "--surface-2": "var(--color-neutral-900)",
  "--surface-3": "var(--color-neutral-800)",
  // Status Colors
  "--success": "oklch(0.8 0.1561 154)",
  "--success-foreground": "oklch(0.1 0.02 0)",
  "--warning": "oklch(0.85 0.1414 77.88)",
  "--warning-foreground": "oklch(0.1 0.02 0)",
  "--danger": "oklch(0.61 0.1998 29.94)",
  "--danger-foreground": "oklch(0.99 0 0)",
  // Misc Colors
  "--border": "oklch(1 0 0 / 12%)",
  "--focus": "oklch(100% 0 0 / 50%)",
  "--link": "var(--foreground)",
  // Shadow
  "--shadow-border":
    "0 0 5px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.2), inset 0 0 1px rgba(255, 255, 255, 0.2)",
  // Glass effects
  "--blur": "0px",
  "--blur-soft": "0px",
  "--blur-strong": "0px",
  "--depth": "0",
};

// Light glass theme tokens
const lightGlassTheme = {
  ...lightTheme,
  // Base Colors with transparency
  "--background": "oklch(100% 0 0 / 60%)",
  "--foreground": "oklch(14.48% 0 0)",
  "--panel": "oklch(100% 0 0 / 70%)",
  // Surface with glass effect
  "--surface": "oklch(100% 0 0 / 40%)",
  "--surface-foreground": "var(--foreground)",
  "--base": "oklch(100% 0 0 / 50%)",
  "--base-foreground": "oklch(14.48% 0 0 / 90%)",
  "--accent": "oklch(0.14 0 0 / 90%)",
  "--accent-foreground": "oklch(0.99 0 0)",
  "--accent-soft": "oklch(0 0 0 / 8%)",
  "--accent-soft-foreground": "oklch(14.48% 0 0 / 80%)",
  // Surface Levels with transparency
  "--surface-1": "oklch(100% 0 0 / 60%)",
  "--surface-2": "oklch(100% 0 0 / 50%)",
  "--surface-3": "oklch(100% 0 0 / 40%)",
  // Borders with transparency
  "--border": "oklch(0 0 0 / 10%)",
  "--focus": "oklch(0% 0 0 / 15%)",
  // Glass-specific effects
  "--blur": "10px",
  "--blur-soft": "5px",
  "--blur-strong": "20px",
  "--depth": "1",
  // Enhanced shadow for glass effect
  "--shadow-border":
    "0 0px 10px 0px rgba(0, 0, 0, 0.03), 0 2px 20px 0px rgba(0, 0, 0, 0.08), 0 0px 1px 0px rgba(0, 0, 0, 0.2)",
};

// Dark glass theme tokens
const darkGlassTheme = {
  ...darkTheme,
  // Base Colors with transparency
  "--background": "oklch(0% 0 0 / 60%)",
  "--foreground": "oklch(99.11% 0 0)",
  "--panel": "oklch(0% 0 0 / 70%)",
  // Surface with glass effect
  "--surface": "oklch(0% 0 0 / 40%)",
  "--surface-foreground": "oklch(99.11% 0 0 / 90%)",
  "--base": "oklch(0% 0 0 / 50%)",
  "--base-foreground": "oklch(99.11% 0 0 / 90%)",
  "--accent": "oklch(0.99 0 0 / 90%)",
  "--accent-foreground": "oklch(0.22 0 0)",
  "--accent-soft": "oklch(100% 0 0 / 8%)",
  "--accent-soft-foreground": "oklch(99.11% 0 0 / 80%)",
  // Surface Levels with transparency
  "--surface-1": "oklch(0% 0 0 / 60%)",
  "--surface-2": "oklch(0% 0 0 / 50%)",
  "--surface-3": "oklch(0% 0 0 / 40%)",
  // Borders with transparency
  "--border": "oklch(100% 0 0 / 10%)",
  "--focus": "oklch(100% 0 0 / 40%)",
  // Glass-specific effects
  "--blur": "10px",
  "--blur-soft": "5px",
  "--blur-strong": "20px",
  "--depth": "1",
  // Enhanced shadow for glass effect
  "--shadow-border":
    "0 0 10px rgba(255, 255, 255, 0.03), 0 2px 20px rgba(0, 0, 0, 0.3), inset 0 0 1px rgba(255, 255, 255, 0.15)",
};

// Export all themes
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  "light-glass": lightGlassTheme,
  "dark-glass": darkGlassTheme,
};
