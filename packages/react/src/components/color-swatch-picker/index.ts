import type {ComponentProps} from "react";

import {
  ColorSwatchPickerItem,
  ColorSwatchPickerRoot,
  ColorSwatchPickerSwatch,
} from "./color-swatch-picker";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ColorSwatchPicker = Object.assign(ColorSwatchPickerRoot, {
  Root: ColorSwatchPickerRoot,
  Item: ColorSwatchPickerItem,
  Swatch: ColorSwatchPickerSwatch,
});

export type ColorSwatchPicker = {
  Props: ComponentProps<typeof ColorSwatchPickerRoot>;
  RootProps: ComponentProps<typeof ColorSwatchPickerRoot>;
  ItemProps: ComponentProps<typeof ColorSwatchPickerItem>;
  SwatchProps: ComponentProps<typeof ColorSwatchPickerSwatch>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ColorSwatchPickerRoot, ColorSwatchPickerItem, ColorSwatchPickerSwatch};

export type {
  ColorSwatchPickerRootProps,
  ColorSwatchPickerRootProps as ColorSwatchPickerProps,
  ColorSwatchPickerItemProps,
  ColorSwatchPickerSwatchProps,
} from "./color-swatch-picker";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {colorSwatchPickerVariants} from "@heroui/styles";

export type {ColorSwatchPickerVariants} from "@heroui/styles";

/* -------------------------------------------------------------------------------------------------
 * Re-export parseColor for convenience
 * -----------------------------------------------------------------------------------------------*/
export {parseColor} from "react-aria-components";
