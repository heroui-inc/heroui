"use client";

import type {Color} from "@/components/color-picker";

import {Button, cn} from "@heroui/react";
import {formatHsl} from "culori";
import {useMemo} from "react";

import ColorPicker, {ColorSlider} from "@/components/color-picker";
import {getHueFromColor, getValuesFromOklch} from "@/components/color-picker/utils/color-format";

import {useVariablesState} from "../hooks/use-variables-state";

import {LockableLabel} from "./lockable-label";

export function AccentColorSelector() {
  const [variables, setVariables] = useVariablesState();
  const {chroma, hue, lightness} = variables;
  const oklchColor = `oklch(${lightness} ${chroma} ${hue})`;

  const trackBackground = useMemo(() => {
    // const displayChroma = Math.max(0.2, chroma);

    // Build gradient with the current chroma level for accurate representation
    const gradientStops = [
      24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336, 360, 24,
    ]
      .map((h) => `oklch(${lightness} ${chroma} ${h})`)
      .join(", ");

    return `linear-gradient(to right, ${gradientStops})`;
  }, [lightness, chroma]);

  const value = formatHsl(oklchColor) ?? "hsl(253.67, 100%, 61.99%)";

  const handleHueSliderChange = (color: Color) => {
    setVariables({
      ...variables,
      hue: getHueFromColor(color),
    });
  };

  const handleColorChange = (color: Color) => {
    const hsl = color.toString("hsl");
    const {chroma, hue, lightness} = getValuesFromOklch(hsl);

    setVariables({
      ...variables,
      chroma,
      hue,
      lightness,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <LockableLabel
        label="Accent"
        tooltip="Main color used for branding and highlights."
        variable="hue"
      />
      <div className="flex flex-row items-center gap-2 overflow-visible">
        <ColorSlider
          channel="hue"
          className="h-6 w-[138px] xl:w-[160px]"
          thumbBackground={oklchColor}
          trackBackground={trackBackground}
          value={value}
          onChange={handleHueSliderChange}
        />
        <ColorPicker
          showSwatches
          showAlpha={false}
          value={value}
          trigger={
            <Button
              isIconOnly
              className="group relative flex size-6 min-h-0 min-w-0 items-center overflow-visible rounded-full p-0"
              variant="ghost"
            >
              {/* Pastel gradient to indicate custom color picker */}
              <div
                className={cn("z-0 size-full rounded-full")}
                style={{
                  background:
                    "conic-gradient(from 0deg, #F8AECF, #FBC7A3, #F7E8A4, #D7F5B0, #B5F3D2, #A3EAF7, #A8C9FF, #C9B8FF, #F8AECF)",
                }}
              />
              <div
                className={cn("absolute inset-0 z-10 rounded-full border-2 border-white/50")}
                style={{
                  background: "transparent",
                }}
              />
            </Button>
          }
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
}
