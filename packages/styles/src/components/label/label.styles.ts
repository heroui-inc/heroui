import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const labelVariants = tv({
  base: "label",
  defaultVariants: {
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
  },
  variants: {
    isDisabled: {
      true: "label--disabled",
    },
    isInvalid: {
      true: "label--invalid",
    },
    isRequired: {
      true: "label--required",
    },
  },
});

export type LabelVariants = VariantProps<typeof labelVariants>;
