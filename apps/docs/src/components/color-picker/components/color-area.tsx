"use client";

import type {ColorAreaProps} from "../types";

import {ColorArea as AriaColorArea, ColorThumb} from "react-aria-components";
import {tv} from "tailwind-variants";

import {composeTailwindRenderProps} from "@/utils/compose-tw-render";
import {focusRing} from "@/utils/focus";

const colorAreaStyles = tv({
  base: "size-full min-h-48 min-w-48 shrink-0 rounded-xl forced-colors:bg-[GrayText]",
});

const colorThumbStyles = tv({
  base: "size-6 rounded-full border-[3px] border-white shadow-lg forced-colors:bg-[Canvas]!",
  extend: focusRing,
});

export function ColorArea({className, colorSpace = "hsb", xChannel, yChannel}: ColorAreaProps) {
  return (
    <AriaColorArea
      className={composeTailwindRenderProps(className, colorAreaStyles())}
      colorSpace={colorSpace}
      xChannel={xChannel}
      yChannel={yChannel}
    >
      <ColorThumb
        className={colorThumbStyles}
        style={({color}) => ({
          background: color.toString("css"),
        })}
      />
    </AriaColorArea>
  );
}
