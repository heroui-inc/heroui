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
    variant: {
      primary: {
        base: "input-group--primary",
      },
      secondary: {
        base: "input-group--secondary",
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
    variant: "primary",
    fullWidth: false,
  },
});

export type InputGroupVariants = VariantProps<typeof inputGroupVariants>;
