import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textAreaVariants = tv({
  base: "textarea",
  variants: {
    variant: {
      primary: "textarea--primary",
      secondary: "textarea--secondary",
    },
    fullWidth: {
      true: "textarea--full-width",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

export type TextAreaVariants = VariantProps<typeof textAreaVariants>;
