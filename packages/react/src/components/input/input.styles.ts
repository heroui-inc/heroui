import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputVariants = tv({
  base: "input",
  variants: {
    isOnSurface: {
      true: "input--on-surface",
      false: {},
    },
  },
  defaultVariants: {
    isOnSurface: false,
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
