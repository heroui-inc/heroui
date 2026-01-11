import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const numberFieldVariants = tv({
  slots: {
    base: "number-field",
    group: "number-field__group",
    input: "number-field__input",
    incrementButton: "number-field__increment-button",
    decrementButton: "number-field__decrement-button",
  },
  variants: {
    variant: {
      primary: {
        base: "number-field--primary",
      },
      secondary: {
        base: "number-field--secondary",
      },
    },
    fullWidth: {
      true: {
        base: "number-field--full-width",
        group: "number-field__group--full-width",
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>;
