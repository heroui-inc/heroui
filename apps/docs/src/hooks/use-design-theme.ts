"use client";

import type {ThemeId} from "@/app/[lang]/themes/constants";
import type {StaticImageData} from "next/image";

import {useCallback, useEffect, useMemo, useState} from "react";

import {themeValuesById} from "@/app/[lang]/themes/constants";
import airbnbTheme from "@/assets/themes/airbnb.png";
import blackTheme from "@/assets/themes/black.png";
import coinbaseTheme from "@/assets/themes/coinbase.png";
import defaultTheme from "@/assets/themes/default.png";
import discordTheme from "@/assets/themes/discord.png";
import lavenderTheme from "@/assets/themes/lavender.png";
import mintTheme from "@/assets/themes/mint.png";
import netflixTheme from "@/assets/themes/netflix.png";
import rabbitTheme from "@/assets/themes/rabbit.png";
import skyTheme from "@/assets/themes/sky.png";
import spotifyTheme from "@/assets/themes/spotify.png";
import {
  DESIGN_THEME_CHANGE_EVENT,
  VIBRANT_STORAGE_KEY,
  getStoredDesignTheme,
  isDesignThemeId,
  setStoredDesignTheme,
  setStoredVibrantPalette,
} from "@/utils/design-theme";

export interface DesignThemeOption {
  id: ThemeId;
  label: string;
  image: StaticImageData;
}

export const DESIGN_THEMES: DesignThemeOption[] = [
  {id: "default", image: defaultTheme, label: "Default"},
  {id: "sky", image: skyTheme, label: "Sky"},
  {id: "lavender", image: lavenderTheme, label: "Lavender"},
  {id: "mint", image: mintTheme, label: "Mint"},
  {id: "netflix", image: netflixTheme, label: "Netflix"},
  {id: "uber", image: blackTheme, label: "Uber"},
  {id: "spotify", image: spotifyTheme, label: "Spotify"},
  {id: "coinbase", image: coinbaseTheme, label: "Coinbase"},
  {id: "airbnb", image: airbnbTheme, label: "Airbnb"},
  {id: "discord", image: discordTheme, label: "Discord"},
  {id: "rabbit", image: rabbitTheme, label: "Rabbit"},
];

/**
 * Design theme state shared by the theme pickers.
 *
 * `DesignThemeScript` applies the stored theme and vibrant palette to `<html>`
 * before first paint; mounting this hook applies them again and keeps the
 * pickers in sync.
 */
export function useDesignTheme() {
  const [active, setActive] = useState<ThemeId>("default");
  const [vibrant, setVibrant] = useState(false);

  useEffect(() => {
    const stored = getStoredDesignTheme();

    if (stored !== "default") setStoredDesignTheme(stored);
    if (localStorage.getItem(VIBRANT_STORAGE_KEY) === "true") setStoredVibrantPalette(true);

    const sync = () => {
      setActive(getStoredDesignTheme());
      setVibrant(localStorage.getItem(VIBRANT_STORAGE_KEY) === "true");
    };

    sync();
    window.addEventListener(DESIGN_THEME_CHANGE_EVENT, sync);

    return () => window.removeEventListener(DESIGN_THEME_CHANGE_EVENT, sync);
  }, []);

  const selectTheme = useCallback((id: string) => {
    if (isDesignThemeId(id)) setStoredDesignTheme(id);
  }, []);

  const setVibrantPalette = useCallback((enabled: boolean) => {
    setStoredVibrantPalette(enabled);
  }, []);

  /** Theme builder URL seeded with the active theme's values. */
  const builderHref = useMemo(() => {
    const values = themeValuesById[active];

    if (!values) return "/themes";

    const params = new URLSearchParams({
      chroma: String(values.chroma),
      hue: String(values.hue),
      lightness: String(values.lightness),
    });

    return `/themes?${params.toString()}`;
  }, [active]);

  const current = DESIGN_THEMES.find((theme) => theme.id === active) ?? DESIGN_THEMES[0]!;

  return {active, builderHref, current, selectTheme, setVibrantPalette, vibrant};
}
