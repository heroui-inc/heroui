import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputVariants = tv({
  base: "input",
  variants: {
    isOnSurface: {
      true: "input--on-surface",
      false: {},
    },
    fullWidth: {
      true: "input--full-width",
      false: "",
    },
  },
  defaultVariants: {
    isOnSurface: false,
    fullWidth: false,
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
