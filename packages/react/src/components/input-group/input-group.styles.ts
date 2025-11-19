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
    isOnSurface: {
      true: {
        base: "input-group--on-surface",
        input: "input-group__input--on-surface",
      },
    },
  },
});

export type InputGroupVariants = VariantProps<typeof inputGroupVariants>;
