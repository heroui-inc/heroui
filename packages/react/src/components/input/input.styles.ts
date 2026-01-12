import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputVariants = tv({
  base: "input",
  variants: {
    variant: {
      primary: "input--primary",
      secondary: "input--secondary",
    },
    fullWidth: {
      true: "input--full-width",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
