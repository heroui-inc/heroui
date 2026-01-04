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
    inSurface: {
      transparent: {
        base: "date-input-group--in-surface-transparent",
        input: "date-input-group__input--in-surface-transparent",
      },
      default: {
        base: "date-input-group--in-surface-default",
        input: "date-input-group__input--in-surface-default",
      },
      secondary: {
        base: "date-input-group--in-surface-secondary",
        input: "date-input-group__input--in-surface-secondary",
      },
      tertiary: {
        base: "date-input-group--in-surface-tertiary",
        input: "date-input-group__input--in-surface-tertiary",
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
