import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const labelVariants = tv({
  base: "label",
  variants: {
    isRequired: {
      true: "label--required",
    },
    isDisabled: {
      true: "label--disabled",
    },
    isInvalid: {
      true: "label--invalid",
    },
  },
  defaultVariants: {
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
  },
});

export type LabelVariants = VariantProps<typeof labelVariants>;
