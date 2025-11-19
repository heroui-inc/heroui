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
    isOnSurface: {
      true: {
        group: "number-field__group--on-surface",
        input: "number-field__input--on-surface",
      },
    },
  },
});

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>;
