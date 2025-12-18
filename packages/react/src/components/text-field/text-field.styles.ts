import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textFieldVariants = tv({
  base: "text-field",
  variants: {
    fullWidth: {
      true: "text-field--full-width",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;
