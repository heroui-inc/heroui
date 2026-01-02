import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const surfaceVariants = tv({
  base: "surface",
  variants: {
    variant: {
      transparent: "surface--transparent",
      default: "surface--default",
      secondary: "surface--secondary",
      tertiary: "surface--tertiary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type SurfaceVariants = VariantProps<typeof surfaceVariants>;
