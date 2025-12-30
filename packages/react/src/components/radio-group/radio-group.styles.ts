import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const radioGroupVariants = tv({
  base: "radio-group",
  variants: {
    inSurface: {
      default: "radio-group--in-surface-default",
      secondary: "radio-group--in-surface-secondary",
      tertiary: "radio-group--in-surface-tertiary",
    },
  },
  defaultVariants: {},
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
