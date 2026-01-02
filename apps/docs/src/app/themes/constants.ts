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
  "oklch(0.6204 0.195 253.83)",
  "oklch(0.6368 0.2078 25.33)",
  "oklch(0.7686 0.1647 70.08)",
  "oklch(0.6959 0.1491 162.48)",
  "oklch(0.6668 0.2591 322.15)",
  "oklch(0 0 0)",
] as const;

export const colors = colorIds.map((id) => ({id, value: id}));

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

export const radiusIds = [
  "none",
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
] as const;
export const radiusOptions: Array<{
  description: string;
  id: (typeof radiusIds)[number];
  label: string;
  value: string;
}> = [
  {description: "none", id: "none", label: "-", value: "none"},
  {description: "extra small", id: "extra-small", label: "XS", value: "extra-small"},
  {description: "small", id: "small", label: "S", value: "small"},
  {description: "medium", id: "medium", label: "M", value: "medium"},
  {description: "large", id: "large", label: "LG", value: "large"},
  {description: "extra large", id: "extra-large", label: "XL", value: "extra-large"},
];

export const themeIds = [
  "default",
  "airbnb",
  "black",
  "coinbase",
  "discord",
  "glass",
  "lavender",
  "mint",
  "netflix",
  "rabbit",
  "sky",
  "spotify",
] as const;
export const themes: Array<{
  id: (typeof themeIds)[number];
  image: StaticImageData;
  label: string;
  value: string;
}> = [
  {id: "default", image: defaultTheme, label: "Default", value: "default"},
  {id: "airbnb", image: airbnbTheme, label: "Airbnb", value: "airbnb"},
  {id: "black", image: blackTheme, label: "Black", value: "black"},
  {id: "coinbase", image: coinbaseTheme, label: "Coinbase", value: "coinbase"},
  {id: "discord", image: discordTheme, label: "Discord", value: "discord"},
  {id: "glass", image: glassTheme, label: "Glass", value: "glass"},
  {id: "lavender", image: lavenderTheme, label: "Lavender", value: "lavender"},
  {id: "mint", image: mintTheme, label: "Mint", value: "mint"},
  {id: "netflix", image: netflixTheme, label: "Netflix", value: "netflix"},
  {id: "rabbit", image: rabbitTheme, label: "Rabbit", value: "rabbit"},
  {id: "sky", image: skyTheme, label: "Sky", value: "sky"},
  {id: "spotify", image: spotifyTheme, label: "Spotify", value: "spotify"},
];

export type ThemeVariables = {
  accentColor: (typeof colorIds)[number];
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
