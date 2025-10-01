import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const labelVariants = tv({
  base: "label",
  variants: {
    size: {
      sm: "label--sm",
      md: "label--md",
      lg: "label--lg",
    },
    variant: {
      default: "label--default",
      muted: "label--muted",
      destructive: "label--destructive",
    },
    required: {
      true: "label--required",
    },
    disabled: {
      true: "label--disabled",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    required: false,
    disabled: false,
  },
});

export type LabelVariants = VariantProps<typeof labelVariants>;
