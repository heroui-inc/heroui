import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const surfaceVariants = tv({
  base: "surface",
  variants: {
    variant: {
      default: "surface--default",
      secondary: "surface--secondary",
      tertiary: "surface--tertiary",
      quaternary: "surface--quaternary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type SurfaceVariants = VariantProps<typeof surfaceVariants>;
