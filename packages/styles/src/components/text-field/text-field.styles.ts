import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textFieldVariants = tv({
  base: "text-field",
  defaultVariants: {
    fullWidth: false,
  },
  variants: {
    fullWidth: {
      false: "",
      true: "text-field--full-width",
    },
  },
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;
