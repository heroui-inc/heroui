import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tagVariants = tv({
  defaultVariants: {
    size: "md",
    isOnSurface: false,
  },
  slots: {
    base: "tag",
    removeTrigger: "tag__remove-trigger",
  },
  variants: {
    size: {
      lg: {
        base: "tag--lg",
      },
      md: {
        base: "tag--md",
      },
      sm: {
        base: "tag--sm",
      },
    },
    isOnSurface: {
      true: {
        base: "tag--on-surface",
        removeTrigger: "tag__remove-trigger--on-surface",
      },
      false: {},
    },
  },
});

export type TagVariants = VariantProps<typeof tagVariants>;
