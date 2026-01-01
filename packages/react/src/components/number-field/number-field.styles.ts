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
    inSurface: {
      transparent: {
        group: "number-field__group--in-surface-transparent",
        input: "number-field__input--in-surface-transparent",
      },
      default: {
        group: "number-field__group--in-surface-default",
        input: "number-field__input--in-surface-default",
      },
      secondary: {
        group: "number-field__group--in-surface-secondary",
        input: "number-field__input--in-surface-secondary",
      },
      tertiary: {
        group: "number-field__group--in-surface-tertiary",
        input: "number-field__input--in-surface-tertiary",
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
    fullWidth: false,
  },
});

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>;
