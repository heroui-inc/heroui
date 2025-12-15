import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const dateFieldVariants = tv({
  slots: {
    base: "date-field",
    group: "date-field__group",
    input: "date-field__input",
    segment: "date-field__segment",
    prefix: "date-field__prefix",
    suffix: "date-field__suffix",
  },
  variants: {
    isOnSurface: {
      true: {
        group: "date-field__group--on-surface",
        input: "date-field__input--on-surface",
      },
    },
  },
});

export type DateFieldVariants = VariantProps<typeof dateFieldVariants>;
