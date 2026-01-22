import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textAreaVariants = tv({
  base: "text-area",
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  variants: {
    fullWidth: {
      false: "",
      true: "text-area--full-width",
    },
    variant: {
      primary: "text-area--primary",
      secondary: "text-area--secondary",
    },
  },
});

export type TextAreaVariants = VariantProps<typeof textAreaVariants>;
