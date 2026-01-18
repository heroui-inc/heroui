import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const checkboxGroupVariants = tv({
  base: "checkbox-group",
  defaultVariants: {
    variant: "primary",
  },
  variants: {
    variant: {
      primary: "checkbox-group--primary",
      secondary: "checkbox-group--secondary",
    },
  },
});

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupVariants>;
