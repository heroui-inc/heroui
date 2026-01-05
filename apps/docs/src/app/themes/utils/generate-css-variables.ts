import type {ThemeVariables} from "../constants";

import {fontMap, radiusCssMap} from "../constants";

/**
 * Generates CSS variables that users can copy-paste into their global.css.
 * Always shows all customizable variables with their current values.
 *
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */
export function generateCssVariables(variables: ThemeVariables): string {
  const font = fontMap[variables.fontFamily];

  return `/*
 * HeroUI Theme Customization
 * Add this to your global.css after importing @heroui/styles
 * @see https://v3.heroui.com/docs/react/getting-started/theming
 */

:root {
  /* Accent & Focus Color */
  --accent: ${variables.accentColor};
  --focus: ${variables.accentColor};

  /* Border Radius */
  --radius: ${radiusCssMap[variables.radius]};
  --field-radius: ${radiusCssMap[variables.formRadius]};

  /* Font Family */
  /* Make sure to load ${font.label} font in your app */
  --font-sans: var(${font.variable});
}`;
}
