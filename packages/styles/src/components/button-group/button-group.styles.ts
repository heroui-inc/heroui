import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const buttonGroupVariants = tv({
  base: "button-group",
  defaultVariants: {
    fullWidth: false,
  },
  variants: {
    fullWidth: {
      false: "",
      true: "button-group--full-width",
    },
  },
});

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
