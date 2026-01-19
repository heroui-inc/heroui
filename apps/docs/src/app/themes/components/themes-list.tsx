"use client";

import type {ThemeId} from "../constants";

import {ListBox, ScrollShadow} from "@heroui/react";
import Image from "next/image";

import {cn} from "@/utils/cn";

import {findMatchingTheme, themeValuesById, themes} from "../constants";
import {useVariablesState} from "../hooks/use-variables-state";

export function ThemesList() {
  const [variables, setVariables] = useVariablesState();
  const currentThemeId = findMatchingTheme(variables);

  const applyTheme = (themeId: ThemeId) => {
    const themeValues = themeValuesById[themeId];

    setVariables({
      base: themeValues.base,
      chroma: themeValues.chroma,
      fontFamily: themeValues.fontFamily,
      formRadius: themeValues.formRadius,
      hue: themeValues.hue,
      lightness: themeValues.lightness,
      radius: themeValues.radius,
    });
  };

  return (
    <ScrollShadow hideScrollBar className="w-full px-4" orientation="horizontal" visibility="none">
      <ListBox
        aria-label="Theme"
        className="flex w-max flex-row flex-nowrap gap-5"
        items={themes}
        selectedKeys={currentThemeId ? new Set([currentThemeId]) : new Set()}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const selected = [...keys][0];

          if (selected) {
            applyTheme(selected as ThemeId);
          }
        }}
      >
        {(item) => (
          <ListBox.Item
            id={item.id}
            textValue={item.id}
            className={cn(
              "group relative flex w-12 shrink-0 flex-col items-center justify-center gap-1.5 p-0",
              "hover:bg-transparent data-[hovered=true]:bg-transparent",
            )}
          >
            <Image
              alt={item.label}
              height={48}
              src={item.image}
              width={48}
              className={cn(
                "size-12 rounded-full bg-surface",
                "group-data-[selected=true]:ring-2 group-data-[selected=true]:ring-accent group-data-[selected=true]:ring-offset-2 group-data-[selected=true]:ring-offset-surface",
              )}
            />
            <span className="text-[10px] font-medium text-muted capitalize group-data-[selected=true]:text-foreground">
              {item.label}
            </span>
          </ListBox.Item>
        )}
      </ListBox>
    </ScrollShadow>
  );
}
