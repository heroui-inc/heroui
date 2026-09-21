import type {ThemeMode} from "./docs-agent-tools";
import type {ThemeId} from "@/app/[lang]/themes/theme-values";
import type {AgentRadius, AgentThemeOptions} from "@heroui/agent";

import {computeThemeVars} from "@/app/[lang]/themes/hooks/use-computed-theme-vars";
import {themeValuesById} from "@/app/[lang]/themes/theme-values";

const radiusMap = {
  "extra-large": "pill",
  "extra-small": "soft",
  large: "round",
  medium: "round",
  none: "sharp",
  small: "soft",
} as const satisfies Record<(typeof themeValuesById)[ThemeId]["radius"], AgentRadius>;

function colorPair(light: Record<string, string>, dark: Record<string, string>, token: string) {
  return {dark: dark[token], light: light[token]};
}

export function getAgentThemeOptions(themeId: ThemeId, colorScheme: ThemeMode): AgentThemeOptions {
  const values = themeValuesById[themeId];
  const {fontMeta, fullDarkVars, fullLightVars} = computeThemeVars(values);

  return {
    colorScheme,
    colors: {
      accent: colorPair(fullLightVars, fullDarkVars, "--accent"),
      background: colorPair(fullLightVars, fullDarkVars, "--background"),
      foreground: colorPair(fullLightVars, fullDarkVars, "--foreground"),
      overlay: colorPair(fullLightVars, fullDarkVars, "--overlay"),
      surface: colorPair(fullLightVars, fullDarkVars, "--surface"),
      surfaceSecondary: colorPair(fullLightVars, fullDarkVars, "--surface-secondary"),
      tooltip: colorPair(fullLightVars, fullDarkVars, "--overlay"),
    },
    radius: radiusMap[values.radius],
    typography: {fontFamily: `"${fontMeta.family}", sans-serif`},
  };
}
