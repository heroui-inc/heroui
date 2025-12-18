import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const timeFieldVariants = tv({
  base: "time-field",
  variants: {
    fullWidth: {
      true: "time-field--full-width",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type TimeFieldVariants = VariantProps<typeof timeFieldVariants>;
