import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const radioGroupVariants = tv({
  base: "radio-group",
  variants: {
    isOnSurface: {
      true: "radio-group--on-surface",
      false: {},
    },
  },
  defaultVariants: {
    isOnSurface: false,
  },
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
