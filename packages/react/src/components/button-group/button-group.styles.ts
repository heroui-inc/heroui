import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const buttonGroupVariants = tv({
  base: "button-group",
  variants: {
    fullWidth: {
      true: "button-group--full-width",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
