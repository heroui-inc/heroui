import type {StaticImageData} from "next/image";

import airbnbTheme from "@/assets/themes/airbnb.png";
import blackTheme from "@/assets/themes/black.png";
import coinbaseTheme from "@/assets/themes/coinbase.png";
import defaultTheme from "@/assets/themes/default.png";
import discordTheme from "@/assets/themes/discord.png";
import glassTheme from "@/assets/themes/glass.png";
import lavenderTheme from "@/assets/themes/lavender.png";
import mintTheme from "@/assets/themes/mint.png";
import netflixTheme from "@/assets/themes/netflix.png";
import rabbitTheme from "@/assets/themes/rabbit.png";
import skyTheme from "@/assets/themes/sky.png";
import spotifyTheme from "@/assets/themes/spotify.png";

export const tabs = ["components", "dashboard", "mail", "chat", "finances"];

export const colorIds = [
  "oklch(0.6199 0.194 253.67)",
  "oklch(0.6356 0.2082 25.38)",
  "oklch(0.7697 0.1645 70.61)",
  "oklch(0.6902 0.1481 162.37)",
  "oklch(0.6683 0.2569 322.02)",
  "oklch(0 0 0)",
] as const;

export const colors = colorIds.map((id) => ({id, value: id}));

/**
 * Adaptive colors that need different values in light vs dark modes.
 * Maps a color ID to its light and dark mode variants.
 */
export const adaptiveColors: Record<string, {light: string; dark: string}> = {
  "oklch(0 0 0)": {
    dark: "oklch(0.9848 0 0)",
    light: "oklch(0 0 0)",
  },
};

export const fontIds = [
  "inter",
  "figtree",
  "hanken-grotesk",
  "geist",
  "dm-sans",
  "public-sans",
  "google-sans",
] as const;
export const fonts: Array<{id: (typeof fontIds)[number]; label: string; variable: string}> = [
  {id: "inter", label: "Inter", variable: "--font-inter"},
  {id: "figtree", label: "Figtree", variable: "--font-figtree"},
  {id: "hanken-grotesk", label: "Hanken Grotesk", variable: "--font-hanken-grotesk"},
  {id: "geist", label: "Geist", variable: "--font-geist"},
  {id: "dm-sans", label: "DM Sans", variable: "--font-dm-sans"},
  {id: "public-sans", label: "Public Sans", variable: "--font-public-sans"},
  {id: "google-sans", label: "Google Sans", variable: "--font-google-sans"},
];

/** Map font ID to font info for quick lookup */
export const fontMap = Object.fromEntries(fonts.map((f) => [f.id, f])) as Record<
  (typeof fontIds)[number],
  (typeof fonts)[number]
>;

export const radiusIds = [
  "none",
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
] as const;
export const radiusOptions: Array<{
  cssValue: string;
  description: string;
  id: (typeof radiusIds)[number];
  label: string;
}> = [
  {cssValue: "0", description: "none", id: "none", label: "-"},
  {cssValue: "0.125rem", description: "extra small", id: "extra-small", label: "XS"},
  {cssValue: "0.25rem", description: "small", id: "small", label: "S"},
  {cssValue: "0.5rem", description: "medium", id: "medium", label: "M"},
  {cssValue: "0.75rem", description: "large", id: "large", label: "LG"},
  {cssValue: "1rem", description: "extra large", id: "extra-large", label: "XL"},
];

/** Map radius ID to CSS value for quick lookup */
export const radiusCssMap = Object.fromEntries(
  radiusOptions.map((r) => [r.id, r.cssValue]),
) as Record<(typeof radiusIds)[number], string>;

export const themeIds = [
  "default",
  "glass",
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
export const themes: Array<{
  id: (typeof themeIds)[number];
  image: StaticImageData;
  label: string;
  value: string;
}> = [
  {id: "default", image: defaultTheme, label: "Default", value: "default"},
  {id: "glass", image: glassTheme, label: "Glass", value: "glass"},
  {id: "sky", image: skyTheme, label: "Sky", value: "sky"},
  {id: "lavender", image: lavenderTheme, label: "Lavender", value: "lavender"},
  {id: "mint", image: mintTheme, label: "Mint", value: "mint"},
  {id: "netflix", image: netflixTheme, label: "Netflix", value: "netflix"},
  {id: "uber", image: blackTheme, label: "Uber", value: "uber"},
  {id: "spotify", image: spotifyTheme, label: "Spotify", value: "spotify"},
  {id: "coinbase", image: coinbaseTheme, label: "Coinbase", value: "coinbase"},
  {id: "airbnb", image: airbnbTheme, label: "Airbnb", value: "airbnb"},
  {id: "discord", image: discordTheme, label: "Discord", value: "discord"},
  {id: "rabbit", image: rabbitTheme, label: "Rabbit", value: "rabbit"},
];

export type ThemeVariables = {
  /** Accent color - can be a predefined colorId or any valid CSS color string */
  accentColor: (typeof colorIds)[number] | string;
  fontFamily: (typeof fontIds)[number];
  formRadius: (typeof radiusIds)[number];
  radius: (typeof radiusIds)[number];
  theme: (typeof themeIds)[number];
};

export const themeVariableKeys = [
  "accentColor",
  "fontFamily",
  "formRadius",
  "radius",
  "theme",
] as const satisfies readonly (keyof ThemeVariables)[];

export const defaultThemeValues: ThemeVariables = {
  accentColor: colorIds[0],
  fontFamily: "inter",
  formRadius: "large",
  radius: "medium",
  theme: "default",
} as const;

export const LOCAL_STORAGE_KEYS = {
  SHUFFLE_WARNING_SHOWN: "shuffle-warning-shown",
} as const;

export const THEME_BUILDER_CONTENT_ID = "theme-builder-content";
