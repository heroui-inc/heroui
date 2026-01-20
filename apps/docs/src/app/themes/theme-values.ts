// Base constants for theme values
export const DEFAULT_BASE = 0.0015 as const;
const BASE_FULL_LEFT = 0 as const;
const BASE_10P_LEFT = 0.002 as const;
const BASE_50P = 0.01 as const;

// Radius options - defined here to avoid circular dependency
export const radiusIds = [
  "none",
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
] as const;

export type RadiusId = (typeof radiusIds)[number];

export type ThemeValues = {
  base: number;
  chroma: number;
  fontFamily: string;
  formRadius: RadiusId;
  hue: number;
  lightness: number;
  radius: RadiusId;
};

export const defaultThemeValues: ThemeValues = {
  base: DEFAULT_BASE,
  chroma: 0.195,
  fontFamily: "inter",
  formRadius: "large",
  hue: 253.83,
  lightness: 0.6204,
  radius: "medium",
} as const;

export const skyThemeValues: ThemeValues = {
  base: DEFAULT_BASE,
  chroma: 0.16,
  fontFamily: "inter",
  formRadius: "large",
  hue: 225,
  lightness: 0.78,
  radius: "medium",
} as const;

export const lavenderThemeValues: ThemeValues = {
  base: DEFAULT_BASE,
  chroma: 0.13,
  fontFamily: "inter",
  formRadius: "large",
  hue: 305,
  lightness: 0.77,
  radius: "medium",
} as const;

export const mintThemeValues: ThemeValues = {
  base: DEFAULT_BASE,
  chroma: 0.12,
  fontFamily: "inter",
  formRadius: "large",
  hue: 155,
  lightness: 0.82,
  radius: "medium",
} as const;

export const netflixThemeValues: ThemeValues = {
  base: BASE_FULL_LEFT,
  chroma: 0.2349,
  fontFamily: "inter",
  formRadius: "extra-small",
  hue: 27.99,
  lightness: 0.5814,
  radius: "extra-small",
} as const;

export const uberThemeValues: ThemeValues = {
  base: BASE_FULL_LEFT,
  chroma: 0,
  fontFamily: "inter",
  formRadius: "small",
  hue: 0,
  lightness: 0,
  radius: "small",
} as const;

export const spotifyThemeValues: ThemeValues = {
  base: BASE_10P_LEFT,
  chroma: 0.2124,
  fontFamily: "inter",
  formRadius: "extra-small",
  hue: 148.67,
  lightness: 0.7697,
  radius: "medium",
} as const;

export const coinbaseThemeValues: ThemeValues = {
  base: BASE_10P_LEFT,
  chroma: 0.2628,
  fontFamily: "inter",
  formRadius: "extra-small",
  hue: 262.87,
  lightness: 0.5282,
  radius: "medium",
} as const;

export const airbnbThemeValues: ThemeValues = {
  base: BASE_FULL_LEFT,
  chroma: 0.2309,
  fontFamily: "inter",
  formRadius: "large",
  hue: 17.07,
  lightness: 0.6579,
  radius: "medium",
} as const;

export const discordThemeValues: ThemeValues = {
  base: BASE_50P,
  chroma: 0.2091,
  fontFamily: "inter",
  formRadius: "large",
  hue: 273.85,
  lightness: 0.5774,
  radius: "small",
} as const;

export const rabbitThemeValues: ThemeValues = {
  base: BASE_50P,
  chroma: 0.2232,
  fontFamily: "inter",
  formRadius: "extra-large",
  hue: 36.66,
  lightness: 0.6678,
  radius: "medium",
} as const;

export const themeIds = [
  "default",
  "sky",
  "lavender",
  "mint",
  "netflix",
  "uber",
  "spotify",
  "coinbase",
  "airbnb",
  "discord",
  "rabbit",
] as const;

export type ThemeId = (typeof themeIds)[number];

export const themeValuesById: Record<ThemeId, ThemeValues> = {
  airbnb: airbnbThemeValues,
  coinbase: coinbaseThemeValues,
  default: defaultThemeValues,
  discord: discordThemeValues,
  lavender: lavenderThemeValues,
  mint: mintThemeValues,
  netflix: netflixThemeValues,
  rabbit: rabbitThemeValues,
  sky: skyThemeValues,
  spotify: spotifyThemeValues,
  uber: uberThemeValues,
} as const;

/**
 * Keys that define a theme's appearance.
 * Used for comparing current values against predefined themes.
 */
export const themeComparisonKeys = [
  "base",
  "chroma",
  "fontFamily",
  "formRadius",
  "hue",
  "lightness",
  "radius",
] as const satisfies readonly (keyof ThemeValues)[];

/**
 * Find which predefined theme matches the current variable values.
 * Returns undefined if no theme matches (i.e., it's a custom theme).
 */
export function findMatchingTheme(currentValues: ThemeValues): ThemeId | undefined {
  for (const themeId of themeIds) {
    const themeValues = themeValuesById[themeId];
    const matches = themeComparisonKeys.every((key) => {
      const current = currentValues[key];
      const theme = themeValues[key];

      // For numbers, use approximate comparison to handle floating point
      if (typeof current === "number" && typeof theme === "number") {
        return Math.abs(current - theme) < 0.0001;
      }

      return current === theme;
    });

    if (matches) {
      return themeId;
    }
  }

  return undefined;
}
