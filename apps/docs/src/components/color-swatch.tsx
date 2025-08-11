"use client";

import type {ColorSwatchProps} from "react-aria-components";

import React from "react";
import {ColorSwatch as AriaColorSwatch} from "react-aria-components";

import {composeTailwindRenderProps} from "@/utils/compose-tw-render";

export function ColorSwatch({
  className,
  ...props
}: Omit<ColorSwatchProps, "className"> & {className?: string}) {
  return (
    <AriaColorSwatch
      {...props}
      className={composeTailwindRenderProps(
        className,
        "dark:border-white/12 h-7 w-7 rounded-full border border-black/10",
      )}
      style={({color}) => ({
        background: `linear-gradient(${color}, ${color}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
      })}
    />
  );
}
