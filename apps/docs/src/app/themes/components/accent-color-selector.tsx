"use client";

import type {Color} from "react-aria-components";

import {Check} from "@gravity-ui/icons";
import {Button, ListBox, cn} from "@heroui/react";

import ColorPicker from "@/components/color-picker";

import {colorIds, colors} from "../constants";
import {useVariableSetter} from "../hooks";

import {LockableLabel} from "./lockable-label";

export function AccentColorSelector() {
  const {setVariable, variables} = useVariableSetter();

  // Check if current color is a predefined color or custom
  const isCustomColor = !colorIds.includes(variables.accentColor as (typeof colorIds)[number]);

  // Check if the color is in a format react-aria can parse (not OKLCH)
  const isOklchColor = variables.accentColor.startsWith("oklch");

  const handleColorChange = (color: Color) => {
    // Convert to CSS color string
    const cssColor = color.toString("css");

    setVariable("accentColor", cssColor);
  };

  return (
    <div className="flex flex-col gap-1">
      <LockableLabel label="Accent Color" variable="accentColor" />
      <div className="flex flex-row items-center gap-2 overflow-visible">
        {/* Predefined Colors */}
        <ListBox
          aria-label="Accent Color"
          className="flex flex-row gap-2 overflow-visible p-0"
          items={colors}
          layout="stack"
          orientation="horizontal"
          selectedKeys={isCustomColor ? new Set() : new Set([variables.accentColor])}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const selected = [...keys][0];

            if (selected) {
              setVariable("accentColor", String(selected));
            }
          }}
        >
          {(item) => (
            <ListBox.Item
              className="group size-8 min-h-0 p-0 data-[hovered=true]:bg-transparent"
              id={item.id}
              textValue={item.id}
            >
              <div
                className="size-8 cursor-pointer rounded-full border-2 border-white/50"
                style={{backgroundColor: item.value}}
              />
              <div className="absolute -top-0.5 -right-1 hidden size-4 items-center justify-center rounded-full border border-background bg-foreground group-data-[selected=true]:flex">
                <Check className="size-3 text-background" />
              </div>
            </ListBox.Item>
          )}
        </ListBox>

        {/* Custom Color Picker - styled to match ListBox items */}
        <ColorPicker
          showSwatches
          defaultValue={isCustomColor && !isOklchColor ? variables.accentColor : "#006FEE"}
          showAlpha={false}
          trigger={
            <Button
              isIconOnly
              className="group relative flex size-8 min-h-0 min-w-0 items-center overflow-visible rounded-full p-0"
              variant="ghost"
            >
              {/* Pastel gradient to indicate custom color picker */}
              <div
                className={cn(
                  "z-0 size-full rounded-full",
                  isCustomColor && "z-10 size-7 border-2 border-background",
                )}
                style={{
                  background: isCustomColor
                    ? variables.accentColor
                    : "conic-gradient(from 0deg, #F8AECF, #FBC7A3, #F7E8A4, #D7F5B0, #B5F3D2, #A3EAF7, #A8C9FF, #C9B8FF, #F8AECF)",
                }}
              />
              <div
                className={cn(
                  "absolute inset-0 z-10 rounded-full border-2 border-white/50",
                  isCustomColor && "z-0 border-none mix-blend-plus-darker",
                )}
                style={{
                  background: isCustomColor
                    ? "conic-gradient(from 0deg, #F8AECF, #FBC7A3, #F7E8A4, #D7F5B0, #B5F3D2, #A3EAF7, #A8C9FF, #C9B8FF, #F8AECF)"
                    : "transparent",
                }}
              />
              {/* Check indicator when custom color is selected */}
              {isCustomColor ? (
                <div className="absolute -top-0.5 -right-1 z-20 flex size-4 items-center justify-center rounded-full border border-background bg-foreground">
                  <Check className="size-3 text-background" />
                </div>
              ) : null}
            </Button>
          }
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
}
