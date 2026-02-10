import type {ComponentProps} from "react";

import {ColorPickerPopover, ColorPickerRoot, ColorPickerTrigger} from "./color-picker";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ColorPicker = Object.assign(ColorPickerRoot, {
  Root: ColorPickerRoot,
  Trigger: ColorPickerTrigger,
  Popover: ColorPickerPopover,
});

export type ColorPicker = {
  Props: ComponentProps<typeof ColorPickerRoot>;
  RootProps: ComponentProps<typeof ColorPickerRoot>;
  TriggerProps: ComponentProps<typeof ColorPickerTrigger>;
  PopoverProps: ComponentProps<typeof ColorPickerPopover>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ColorPickerPopover, ColorPickerRoot, ColorPickerTrigger};

export type {
  ColorPickerRootProps,
  ColorPickerRootProps as ColorPickerProps,
  ColorPickerTriggerProps,
  ColorPickerPopoverProps,
} from "./color-picker";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {colorPickerVariants} from "@heroui/styles";

export type {ColorPickerVariants} from "@heroui/styles";
