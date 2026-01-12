import type {ThemeVariables} from "../constants";

import {adaptiveColors, fontMap, radiusCssMap} from "../constants";

import {calculateForeground} from "./calculate-foreground";

/**
 * Generates CSS variables that users can copy-paste into their global.css.
 * Always shows all customizable variables with their current values.
 *
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */
export function generateCssVariables(variables: ThemeVariables): string {
  const font = fontMap[variables.fontFamily];
  const adaptiveConfig = adaptiveColors[variables.accentColor];

  // Check if this is an adaptive color that needs light/dark variants
  if (adaptiveConfig) {
    const lightForeground = calculateForeground(adaptiveConfig.light);
    const darkForeground = calculateForeground(adaptiveConfig.dark);

    return `/*
 * HeroUI Theme Customization
 * Add this to your global.css after importing @heroui/styles
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */

:root,
  .light,
  .default,
  [data-theme="light"],
  [data-theme="default"] {
  /* Accent & Focus Color (Light Mode) */
  --accent: ${adaptiveConfig.light};
  --accent-foreground: ${lightForeground};
  --focus: ${adaptiveConfig.light};

  /* Border Radius */
  --radius: ${radiusCssMap[variables.radius]};
  --field-radius: ${radiusCssMap[variables.formRadius]};

  /* Font Family */
  /* Make sure to load ${font.label} font in your app */
  --font-sans: var(${font.variable});
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
  /* Accent & Focus Color (Dark Mode) */
  --accent: ${adaptiveConfig.dark};
  --accent-foreground: ${darkForeground};
  --focus: ${adaptiveConfig.dark};
}`;
  }

  const accentForeground = calculateForeground(variables.accentColor);

  return `/*
 * HeroUI Theme Customization
 * Add this to your global.css after importing @heroui/styles
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */

:root {
  /* Accent & Focus Color */
  --accent: ${variables.accentColor};
  --accent-foreground: ${accentForeground};
  --focus: ${variables.accentColor};

  /* Border Radius */
  --radius: ${radiusCssMap[variables.radius]};
  --field-radius: ${radiusCssMap[variables.formRadius]};

  /* Font Family */
  /* Make sure to load ${font.label} font in your app */
  --font-sans: var(${font.variable});
}`;
}
