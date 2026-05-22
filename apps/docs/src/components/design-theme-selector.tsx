"use client";

import type {ThemeId} from "@/app/themes/constants";
import type {StaticImageData} from "next/image";

import {BucketPaint, Palette} from "@gravity-ui/icons";
import {Button, Description, Label, ListBox, Popover, Switch, buttonVariants} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";
import Image from "next/image";
import {useCallback, useEffect, useMemo, useState} from "react";

import {themeValuesById} from "@/app/themes/constants";
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
import {cn} from "@/utils/cn";

const STORAGE_KEY = "heroui-docs-design-theme";
const VIBRANT_STORAGE_KEY = "heroui-docs-vibrant-palette";

interface ThemeOption {
  id: string;
  label: string;
  image: StaticImageData;
}

const THEMES: ThemeOption[] = [
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

function removeThemeCssLink() {
  document.getElementById("design-theme-css-link")?.remove();
}

function applyTheme(themeId: string) {
  const root = document.documentElement;
  const isDefault = themeId === "default";

  if (isDefault) {
    root.removeAttribute("data-design-theme");
  } else {
    root.setAttribute("data-design-theme", themeId);
  }

  removeThemeCssLink();
}

export function DesignThemeSelector() {
  const [active, setActive] = useState("default");
  const [vibrant, setVibrant] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored && THEMES.some((t) => t.id === stored)) {
      setActive(stored);
      applyTheme(stored);
    }

    const storedVibrant = localStorage.getItem(VIBRANT_STORAGE_KEY);

    if (storedVibrant === "true") {
      setVibrant(true);
      document.documentElement.setAttribute("data-vibrant-palette", "true");
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSelect = useCallback((keys: "all" | Set<React.Key>) => {
    if (keys === "all") return;
    const selected = [...keys][0];

    if (typeof selected !== "string") return;
    setActive(selected);
    localStorage.setItem(STORAGE_KEY, selected);
    applyTheme(selected);
  }, []);

  const handleVibrantToggle = useCallback((isSelected: boolean) => {
    setVibrant(isSelected);
    localStorage.setItem(VIBRANT_STORAGE_KEY, String(isSelected));

    if (isSelected) {
      document.documentElement.setAttribute("data-vibrant-palette", "true");
    } else {
      document.documentElement.removeAttribute("data-vibrant-palette");
    }
  }, []);

  const current = THEMES.find((t) => t.id === active);
  const showAvatar = mounted && active !== "default" && current;

  const themeBuilderHref = useMemo(() => {
    const themeId = active as ThemeId;
    const values = themeValuesById[themeId];

    if (!values) {
      return "/themes";
    }

    const params = new URLSearchParams();

    params.set("lightness", String(values.lightness));
    params.set("chroma", String(values.chroma));
    params.set("hue", String(values.hue));

    return `/themes?${params.toString()}`;
  }, [active]);

  return (
    <>
      {/* Preload all theme images so they're cached before the popover opens */}
      <div aria-hidden className="pointer-events-none fixed size-0 overflow-hidden opacity-0">
        {THEMES.map((t) => (
          <Image
            key={t.id}
            priority
            alt=""
            height={36}
            placeholder="blur"
            src={t.image}
            width={36}
          />
        ))}
      </div>
      <Popover>
        <Popover.Trigger>
          <Button
            aria-label="Design theme"
            size="sm"
            variant="tertiary"
            className={cn(
              "text-xs text-muted",
              showAvatar &&
                "max-sm:min-w-0 max-sm:border-0 max-sm:bg-transparent max-sm:px-0 sm:gap-1.5 sm:pr-2.5 sm:pl-2",
            )}
          >
            {showAvatar ? (
              <Image
                alt={current.label}
                className="size-5 shrink-0 rounded-full sm:size-3.5"
                height={20}
                placeholder="blur"
                src={current.image}
                width={20}
              />
            ) : (
              <BucketPaint className="size-3.5 text-foreground" />
            )}
            <span className="hidden sm:inline">{showAvatar ? current.label : "Theme"}</span>
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-[248px] rounded-3xl" placement="bottom">
          <Popover.Dialog className="p-4">
            <ListBox
              aria-label="Design theme"
              className="grid grid-cols-4 gap-3"
              items={THEMES}
              layout="grid"
              selectedKeys={new Set([active])}
              selectionMode="single"
              onSelectionChange={handleSelect}
            >
              {(item) => (
                <ListBox.Item
                  key={item.id}
                  id={item.id}
                  textValue={item.label}
                  className={cn(
                    "group relative flex w-10 flex-col items-center justify-center gap-1.5 p-0",
                    "hover:bg-transparent data-[hovered=true]:bg-transparent",
                  )}
                >
                  <Image
                    alt={item.label}
                    height={36}
                    placeholder="blur"
                    src={item.image}
                    width={36}
                    className={cn(
                      "size-9 rounded-full bg-surface",
                      "group-data-[selected=true]:ring-2 group-data-[selected=true]:ring-accent group-data-[selected=true]:ring-offset-2 group-data-[selected=true]:ring-offset-surface",
                    )}
                  />
                  <span className="text-[10px] font-medium text-muted capitalize group-data-[selected=true]:text-foreground">
                    {item.label}
                  </span>
                </ListBox.Item>
              )}
            </ListBox>
            <div className="mt-4 border-t border-separator pt-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <Label className="text-xs">Vibrant palette</Label>
                  <Description className="text-[10px]">More saturated, less contrast</Description>
                </div>
                <Switch isSelected={vibrant} onChange={handleVibrantToggle}>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch>
              </div>
            </div>
            <LinkRoot
              href={themeBuilderHref}
              className={buttonVariants({
                className: "mt-3 rounded-full text-[13px] text-muted",
                fullWidth: true,
                size: "sm",
                variant: "outline",
              })}
            >
              <Palette className="size-4" />
              Edit theme
            </LinkRoot>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </>
  );
}
