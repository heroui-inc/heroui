import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const checkboxVariants = tv({
  slots: {
    base: "checkbox",
    control: "checkbox__control",
    indicator: "checkbox__indicator",
    content: "checkbox__content",
  },
  variants: {
    isOnSurface: {
      true: {
        base: "checkbox--on-surface",
      },
      false: {},
    },
  },
  defaultVariants: {
    isOnSurface: false,
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
