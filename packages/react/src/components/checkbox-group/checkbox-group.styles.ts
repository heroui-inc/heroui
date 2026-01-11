import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const checkboxGroupVariants = tv({
  base: "checkbox-group",
  variants: {
    variant: {
      primary: "checkbox-group--primary",
      secondary: "checkbox-group--secondary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupVariants>;
