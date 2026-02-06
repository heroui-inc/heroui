import type {ComponentProps} from "react";

import {ColorAreaRoot, ColorAreaThumb} from "./color-area";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ColorArea = Object.assign(ColorAreaRoot, {
  Root: ColorAreaRoot,
  Thumb: ColorAreaThumb,
});

export type ColorArea = {
  Props: ComponentProps<typeof ColorAreaRoot>;
  RootProps: ComponentProps<typeof ColorAreaRoot>;
  ThumbProps: ComponentProps<typeof ColorAreaThumb>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ColorAreaRoot, ColorAreaThumb};

export type {
  ColorAreaRootProps,
  ColorAreaRootProps as ColorAreaProps,
  ColorAreaThumbProps,
} from "./color-area";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {colorAreaVariants} from "@heroui/styles";

export type {ColorAreaVariants} from "@heroui/styles";
