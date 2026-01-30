import type {ComponentProps} from "react";

import {
  ColorSliderOutput,
  ColorSliderRoot,
  ColorSliderThumb,
  ColorSliderTrack,
} from "./color-slider";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ColorSlider = Object.assign(ColorSliderRoot, {
  Root: ColorSliderRoot,
  Output: ColorSliderOutput,
  Track: ColorSliderTrack,
  Thumb: ColorSliderThumb,
});

export type ColorSlider = {
  Props: ComponentProps<typeof ColorSliderRoot>;
  RootProps: ComponentProps<typeof ColorSliderRoot>;
  OutputProps: ComponentProps<typeof ColorSliderOutput>;
  TrackProps: ComponentProps<typeof ColorSliderTrack>;
  ThumbProps: ComponentProps<typeof ColorSliderThumb>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ColorSliderRoot, ColorSliderOutput, ColorSliderTrack, ColorSliderThumb};

export type {
  ColorSliderRootProps,
  ColorSliderRootProps as ColorSliderProps,
  ColorSliderOutputProps,
  ColorSliderTrackProps,
  ColorSliderThumbProps,
  // Channel types for type-safe usage
  HSLChannel,
  HSBChannel,
  RGBChannel,
  SharedChannel,
  ColorSliderChannelProps,
} from "./color-slider";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {colorSliderVariants} from "@heroui/styles";

export type {ColorSliderVariants} from "@heroui/styles";
