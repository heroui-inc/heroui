import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const colorSwatchVariants = tv({
  base: "color-swatch",
  defaultVariants: {
    shape: "circle",
    size: "md",
  },
  variants: {
    shape: {
      circle: "color-swatch--circle",
      square: "color-swatch--square",
    },
    size: {
      lg: "color-swatch--lg",
      md: "color-swatch--md",
      sm: "color-swatch--sm",
      xl: "color-swatch--xl",
      xs: "color-swatch--xs",
    },
  },
});

export type ColorSwatchVariants = VariantProps<typeof colorSwatchVariants>;
