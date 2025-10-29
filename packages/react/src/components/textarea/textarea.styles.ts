import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textAreaVariants = tv({
  base: "textarea",
  variants: {
    isOnSurface: {
      true: "textarea--on-surface",
      false: {},
    },
  },
  defaultVariants: {
    isOnSurface: false,
  },
});

export type TextAreaVariants = VariantProps<typeof textAreaVariants>;
