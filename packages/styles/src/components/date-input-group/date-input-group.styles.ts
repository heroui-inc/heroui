import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const dateInputGroupVariants = tv({
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  slots: {
    base: "date-input-group",
    input: "date-input-group__input",
    prefix: "date-input-group__prefix",
    segment: "date-input-group__segment",
    suffix: "date-input-group__suffix",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "date-input-group--full-width",
      },
    },
    variant: {
      primary: {
        base: "date-input-group--primary",
      },
      secondary: {
        base: "date-input-group--secondary",
      },
    },
  },
});

export type DateInputGroupVariants = VariantProps<typeof dateInputGroupVariants>;
