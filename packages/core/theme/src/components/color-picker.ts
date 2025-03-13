import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

/**
 */
const colorPicker = tv({
  slots: {
    base: [
      "flex",
      "flex-col",
      "relative",
      "overflow-hidden",
      "h-auto",
      "outline-none",
      "text-foreground",
      "box-border",
      "bg-content1",
      ...dataFocusVisibleClasses,
    ],
  },
  variants: {
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed",
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    isDisabled: false,
  },
});

export type ColorPickerVariantProps = VariantProps<typeof colorPicker>;
export type ColorPickerSlots = keyof ReturnType<typeof colorPicker>;
export type ColorPickerReturnType = ReturnType<typeof colorPicker>;

export {colorPicker};
