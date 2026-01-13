"use client";

import type {ColorSliderProps} from "../types";

import {ColorSlider as AriaColorSlider, ColorThumb, SliderTrack} from "react-aria-components";
import {tv} from "tailwind-variants";

import {cn} from "@/utils/cn";
import {focusRing} from "@/utils/focus";

const colorSliderTrackStyles = tv({
  base: "h-8 w-full rounded-full forced-colors:bg-[GrayText]",
  variants: {
    orientation: {
      horizontal: "h-8 w-full",
      vertical: "ml-2 h-full w-8",
    },
  },
});

const colorThumbStyles = tv({
  base: "size-4 rounded-full border-[1.5px] border-white shadow-lg forced-colors:bg-[Canvas]!",
  extend: focusRing,
});

export function ColorSlider({
  channel,
  className,
  colorSpace,
  orientation = "horizontal",
}: ColorSliderProps) {
  return (
    <AriaColorSlider
      channel={channel}
      className={cn("group flex w-full max-w-[184px] flex-col gap-1", className)}
      colorSpace={colorSpace}
      orientation={orientation}
    >
      <SliderTrack
        className={colorSliderTrackStyles({orientation})}
        style={({defaultStyle}) => ({
          background: `${defaultStyle.background}`,
        })}
      >
        <ColorThumb
          className={cn(colorThumbStyles(), orientation === "horizontal" ? "top-1/2" : "left-1/2")}
          style={({color}) => ({
            background: color.toString("css"),
          })}
        />
      </SliderTrack>
    </AriaColorSlider>
  );
}
