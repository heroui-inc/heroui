"use client";

import type {ColorSwatchPickerItemProps, ColorSwatchPickerProps} from "react-aria-components";

import React from "react";
import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
} from "react-aria-components";
import {tv} from "tailwind-variants";

import {composeTailwindRenderProps, focusRing} from "@/utils/compose-tw-render";

import {ColorSwatch} from "./color-swatch";

const itemStyles = tv({
  base: "rounded-xs relative",
  extend: focusRing,
});

const focusIndicator = tv({
  base: "absolute left-0 top-0 h-full w-full scale-[0.5] rounded-full border-2 border-black opacity-0 outline-2 -outline-offset-4 outline-white transition-all forced-color-adjust-none dark:border-white dark:outline-black",
  variants: {
    isSelected: {
      true: "scale-100 opacity-100",
    },
  },
});

export function ColorSwatchPickerItem({
  className,
  outlineColor,
  outlineOffsetColor,
  ...props
}: Omit<ColorSwatchPickerItemProps, "className"> & {
  className?: string;
  outlineColor?: string;
  outlineOffsetColor?: string;
}) {
  return (
    <AriaColorSwatchPickerItem {...props} className={itemStyles}>
      {({isSelected}) => (
        <>
          <ColorSwatch className={className} />
          <div
            className={focusIndicator({isSelected})}
            data-selected={isSelected}
            style={{
              borderColor: outlineColor,
              outlineColor: outlineOffsetColor,
            }}
          />
        </>
      )}
    </AriaColorSwatchPickerItem>
  );
}

export function ColorSwatchPicker({
  children,
  ...props
}: Omit<ColorSwatchPickerProps, "layout" | "className"> & {className?: string}) {
  return (
    <AriaColorSwatchPicker
      {...props}
      className={composeTailwindRenderProps(props.className, "flex gap-1")}
    >
      {children}
    </AriaColorSwatchPicker>
  );
}
