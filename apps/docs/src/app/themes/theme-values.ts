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

/**
 * Semantic color override for a single color (success, warning, or danger)
 */
export interface SemanticColorOverride {
  /** OKLCH color string e.g. "oklch(0.5148 0.1337 146.82)" */
  color: string;
  /** Optional foreground color - if not provided, will be calculated automatically */
  foreground?: string;
}

/**
 * Semantic color overrides for light and dark modes.
 * Allows themes to specify exact semantic colors instead of using calculated values.
 */
export interface ThemeSemanticOverrides {
  light?: {
    /** Override the accent foreground color (text on accent background) */
    accentForeground?: string;
    danger?: SemanticColorOverride;
    success?: SemanticColorOverride;
    warning?: SemanticColorOverride;
  };
  dark?: {
    /** Override the accent foreground color (text on accent background) */
    accentForeground?: string;
    danger?: SemanticColorOverride;
    success?: SemanticColorOverride;
    warning?: SemanticColorOverride;
  };
}

export type ThemeValues = {
  base: number;
  chroma: number;
  fontFamily: string;
  formRadius: RadiusId;
  hue: number;
  lightness: number;
  radius: RadiusId;
  /** Optional semantic color overrides for light/dark modes */
  semanticOverrides?: ThemeSemanticOverrides;
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
  semanticOverrides: {
    dark: {
      danger: {color: "oklch(0.4964 0.1994 28.56)"}, // #B9090B
      success: {color: "oklch(0.7677 0.1899 148.1)"}, // #46D369
      warning: {color: "oklch(0.8239 0.153 74.6)"}, // #FFB53F
    },
    light: {
      danger: {color: "oklch(0.4823 0.1938 27.64)"}, // #B20710
      success: {color: "oklch(0.5148 0.1337 146.82)"}, // #237b35
      warning: {color: "oklch(0.561 0.116571 78.9352)"}, // #996b00
    },
  },
} as const;

export const uberThemeValues: ThemeValues = {
  base: BASE_FULL_LEFT,
  chroma: 0,
  fontFamily: "inter",
  formRadius: "small",
  hue: 0,
  lightness: 0,
  radius: "small",
  semanticOverrides: {
    dark: {
      danger: {color: "oklch(0.7044 0.1872 23.19)"}, // #FF6666
      success: {color: "oklch(0.6514 0.1321 156.22)"}, // #3AA76D
      warning: {color: "oklch(0.8803 0.1348 86.06)"}, // #FFD166
    },
    light: {
      danger: {color: "oklch(0.573 0.2249 21.97)"}, // #DE1135
      success: {color: "oklch(0.6277 0.1604 153.06)"}, // #05A357
      warning: {color: "oklch(0.8446 0.1525 80.6)"}, // #FFC043
    },
  },
} as const;

export const spotifyThemeValues: ThemeValues = {
  base: BASE_10P_LEFT,
  chroma: 0.2124,
  fontFamily: "inter",
  formRadius: "extra-small",
  hue: 148.67,
  lightness: 0.7697,
  radius: "medium",
  semanticOverrides: {
    dark: {
      danger: {color: "oklch(0.5931 0.2338 25.42)"}, // #E91429
      success: {color: "oklch(0.7697 0.2124 148.67)"}, // #1ED760
      warning: {color: "oklch(0.7921 0.1626 67.42)"}, // #FFA42B
    },
    light: {
      danger: {color: "oklch(0.5509 0.2166 25.29)"}, // #D31225
      success: {color: "oklch(0.6072 0.1647 149.02)"}, // #169C46
      warning: {color: "oklch(0.6972 0.1687 54.22)"}, // #EB7B15
    },
  },
} as const;

export const coinbaseThemeValues: ThemeValues = {
  base: BASE_10P_LEFT,
  chroma: 0.2628,
  fontFamily: "inter",
  formRadius: "extra-small",
  hue: 262.87,
  lightness: 0.5282,
  radius: "medium",
  semanticOverrides: {
    dark: {
      danger: {color: "oklch(0.6545 0.2145 22.31)"}, // #F84550
      success: {color: "oklch(0.7574 0.180554 156.931)"}, // #00D180
      warning: {color: "oklch(0.8095 0.1119 61.69)"}, // #F5B073
    },
    light: {
      danger: {color: "oklch(0.5507 0.2062 24)"}, // #CF202F
      success: {color: "oklch(0.5438 0.1268 157.17)"}, // #098551
      warning: {color: "oklch(0.8095 0.1119 61.69)"}, // #F5B073
    },
  },
} as const;

export const airbnbThemeValues: ThemeValues = {
  base: BASE_FULL_LEFT,
  chroma: 0.2309,
  fontFamily: "inter",
  formRadius: "large",
  hue: 17.07,
  lightness: 0.6579,
  radius: "medium",
  semanticOverrides: {
    dark: {
      accentForeground: "oklch(0.9911 0 0)", // white
      danger: {color: "oklch(0.5392 0.1816 33.72)", foreground: "oklch(0.9911 0 0)"}, // #C13515, white fg
      success: {color: "oklch(0.652 0.114864 185.0749)", foreground: "oklch(0.9911 0 0)"}, // #00A699, white fg
      warning: {color: "oklch(0.8197 0.170602 78.4658)"}, // #FFB400
    },
    light: {
      accentForeground: "oklch(0.9911 0 0)", // white
      danger: {color: "oklch(0.5392 0.1816 33.72)", foreground: "oklch(0.9911 0 0)"}, // #C13515, white fg
      success: {color: "oklch(0.5573 0.0947 199.48)", foreground: "oklch(0.9911 0 0)"}, // #008489, white fg
      warning: {color: "oklch(0.6904 0.1972 38.75)", foreground: "oklch(0.9911 0 0)"}, // #FC642D, white fg
    },
  },
} as const;

export const discordThemeValues: ThemeValues = {
  base: BASE_50P,
  chroma: 0.2091,
  fontFamily: "inter",
  formRadius: "large",
  hue: 273.85,
  lightness: 0.5774,
  radius: "small",
  semanticOverrides: {
    dark: {
      danger: {color: "oklch(0.6318 0.2075 24.57)"}, // #ED4245
      success: {color: "oklch(0.8548 0.1967 150.16)"}, // #57F287
      warning: {color: "oklch(0.9218 0.1571 99.87)"}, // #FEE75C
    },
    light: {
      danger: {color: "oklch(0.5884 0.1993 24.39)"}, // #DA373C
      success: {color: "oklch(0.532 0.1238 151.57)"}, // #248046
      warning: {color: "oklch(0.9218 0.1571 99.87)"}, // #FEE75C
    },
  },
} as const;

export const rabbitThemeValues: ThemeValues = {
  base: BASE_50P,
  chroma: 0.2232,
  fontFamily: "inter",
  formRadius: "extra-large",
  hue: 36.66,
  lightness: 0.6678,
  radius: "medium",
  semanticOverrides: {
    dark: {
      danger: {color: "oklch(0.6291 0.2565 29.09)"}, // #FF0606
      success: {color: "oklch(0.7113 0.2043 140.81)"}, // #4ABF34
    },
    light: {
      danger: {color: "oklch(0.6291 0.2565 29.09)"}, // #FF0606
      success: {color: "oklch(0.7113 0.2043 140.81)"}, // #4ABF34
    },
  },
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
