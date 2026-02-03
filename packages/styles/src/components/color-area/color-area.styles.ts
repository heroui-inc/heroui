import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const colorAreaVariants = tv({
  defaultVariants: {
    showDots: false,
  },
  slots: {
    base: "color-area",
    thumb: "color-area__thumb",
  },
  variants: {
    showDots: {
      false: {},
      true: {
        base: "color-area--show-dots",
      },
    },
  },
});

export type ColorAreaVariants = VariantProps<typeof colorAreaVariants>;
