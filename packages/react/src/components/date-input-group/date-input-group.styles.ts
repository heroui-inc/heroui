import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const dateInputGroupVariants = tv({
  slots: {
    base: "date-input-group",
    input: "date-input-group__input",
    segment: "date-input-group__segment",
    prefix: "date-input-group__prefix",
    suffix: "date-input-group__suffix",
  },
  variants: {
    isOnSurface: {
      true: {
        base: "date-input-group--on-surface",
        input: "date-input-group__input--on-surface",
      },
    },
    fullWidth: {
      true: {
        base: "date-input-group--full-width",
      },
      false: {},
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type DateInputGroupVariants = VariantProps<typeof dateInputGroupVariants>;
