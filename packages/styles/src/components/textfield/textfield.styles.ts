import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textFieldVariants = tv({
  base: "textfield",
  defaultVariants: {
    fullWidth: false,
  },
  variants: {
    fullWidth: {
      false: "",
      true: "textfield--full-width",
    },
  },
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;
