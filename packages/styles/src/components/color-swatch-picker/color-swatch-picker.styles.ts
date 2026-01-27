import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const colorSwatchPickerVariants = tv({
  defaultVariants: {
    size: "md",
    variant: "circle",
  },
  slots: {
    base: "color-swatch-picker",
    item: "color-swatch-picker__item",
    swatch: "color-swatch-picker__swatch",
  },
  variants: {
    size: {
      lg: {
        base: "color-swatch-picker--lg",
      },
      md: {
        base: "color-swatch-picker--md",
      },
      sm: {
        base: "color-swatch-picker--sm",
      },
      xl: {
        base: "color-swatch-picker--xl",
      },
      xs: {
        base: "color-swatch-picker--xs",
      },
    },
    variant: {
      circle: {
        base: "color-swatch-picker--circle",
      },
      square: {
        base: "color-swatch-picker--square",
      },
    },
  },
});

export type ColorSwatchPickerVariants = VariantProps<typeof colorSwatchPickerVariants>;
