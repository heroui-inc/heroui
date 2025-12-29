import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputGroupVariants = tv({
  slots: {
    base: "input-group",
    input: "input-group__input",
    prefix: "input-group__prefix",
    suffix: "input-group__suffix",
  },
  variants: {
    inSurface: {
      default: {
        base: "input-group--in-surface-default",
        input: "input-group__input--in-surface-default",
      },
      secondary: {
        base: "input-group--in-surface-secondary",
        input: "input-group__input--in-surface-secondary",
      },
      tertiary: {
        base: "input-group--in-surface-tertiary",
        input: "input-group__input--in-surface-tertiary",
      },
    },
    fullWidth: {
      true: {
        base: "input-group--full-width",
      },
      false: {},
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type InputGroupVariants = VariantProps<typeof inputGroupVariants>;
