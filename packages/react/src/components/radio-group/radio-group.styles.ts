import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const radioGroupVariants = tv({
  base: "radio-group",
  variants: {
    variant: {
      primary: "radio-group--primary",
      secondary: "radio-group--secondary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
