import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const dateFieldVariants = tv({
  base: "date-field",
  variants: {
    fullWidth: {
      true: "date-field--full-width",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type DateFieldVariants = VariantProps<typeof dateFieldVariants>;
