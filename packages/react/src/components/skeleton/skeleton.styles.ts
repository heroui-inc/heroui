import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const skeletonVariants = tv({
  slots: {
    base: "skeleton",
  },
  variants: {
    animationType: {
      shimmer: "skeleton--shimmer",
      pulse: "skeleton--pulse",
      none: "skeleton--none",
    },
  },
  defaultVariants: {
    animationType: "shimmer",
  },
});

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
