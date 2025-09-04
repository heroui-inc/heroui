import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const skeletonVariants = tv({
  slots: {
    base: "skeleton",
  },
});

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
