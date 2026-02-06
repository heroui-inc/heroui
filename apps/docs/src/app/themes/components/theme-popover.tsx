"use client";

import type {ThemeId} from "../constants";

import {BucketPaint, ChevronsExpandVertical} from "@gravity-ui/icons";
import {InputGroup, Kbd, Label, ListBox, Popover} from "@heroui/react";
import Image from "next/image";

import useKeyPress from "@/hooks/use-key-press";
import {cn} from "@/utils/cn";

import {findMatchingTheme, themeValuesById, themes} from "../constants";
import {useVariablesState} from "../hooks/use-variables-state";

export function ThemePopover() {
  const [variables, setVariables] = useVariablesState();
  const currentThemeId = findMatchingTheme(variables);
  const currentTheme = currentThemeId ? themes.find((t) => t.id === currentThemeId) : undefined;

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

  const randomizeTheme = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    if (randomTheme) {
      applyTheme(randomTheme.id);
    }
  };

  useKeyPress("t", randomizeTheme);

  return (
    <Popover>
      <div className="flex flex-col gap-1">
        <Label>Theme</Label>
        <Popover.Trigger>
          <InputGroup className="w-40 cursor-pointer">
            <InputGroup.Prefix className="w-10">
              <BucketPaint />
            </InputGroup.Prefix>
            <InputGroup.Input
              readOnly
              className="max-w-20 cursor-pointer capitalize"
              id="theme"
              name="theme"
              value={currentTheme?.label ?? "Custom"}
            />
            <InputGroup.Suffix className="w-10">
              <ChevronsExpandVertical className="size-3" />
            </InputGroup.Suffix>
          </InputGroup>
        </Popover.Trigger>
      </div>
      <Popover.Content className="w-[228px] rounded-3xl" placement="top">
        <Popover.Dialog className="p-4">
          <ListBox
            aria-label="Theme"
            className="grid grid-cols-4 gap-3"
            items={themes}
            layout="grid"
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
                  "group relative flex w-10 flex-col items-center justify-center gap-1.5 p-0",
                  "hover:bg-transparent data-[hovered=true]:bg-transparent",
                )}
              >
                <Image
                  alt={item.label}
                  height={36}
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
          <p className="mt-5 text-xs text-muted">
            Press{" "}
            <Kbd>
              <Kbd.Content>T</Kbd.Content>
            </Kbd>{" "}
            to pick random
          </p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
