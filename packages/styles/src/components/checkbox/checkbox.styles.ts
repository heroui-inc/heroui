import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const checkboxVariants = tv({
  defaultVariants: {
    variant: "primary",
  },
  slots: {
    base: "checkbox",
    button: "checkbox__button",
    control: "checkbox__control",
    indicator: "checkbox__indicator",
  },
  variants: {
    variant: {
      primary: {
        base: "checkbox--primary",
      },
      secondary: {
        base: "checkbox--secondary",
      },
    },
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
