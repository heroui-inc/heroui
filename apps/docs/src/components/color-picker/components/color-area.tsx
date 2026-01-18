"use client";

import type {ColorAreaProps} from "../types";

import {ColorArea as AriaColorArea, ColorThumb} from "react-aria-components";
import {tv} from "tailwind-variants";

import {composeTailwindRenderProps} from "@/utils/compose-tw-render";
import {focusRing} from "@/utils/focus";

const colorAreaStyles = tv({
  base: "size-[232px] shrink-0 rounded-2xl border border-border forced-colors:bg-[GrayText]",
});

const colorThumbStyles = tv({
  base: "size-6 rounded-full border-2 border-white shadow-lg forced-colors:bg-[Canvas]!",
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
