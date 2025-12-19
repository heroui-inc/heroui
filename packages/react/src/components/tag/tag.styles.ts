import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tagVariants = tv({
  defaultVariants: {
    size: "md",
    isOnSurface: false,
    variant: "default",
  },
  slots: {
    base: "tag",
    removeButton: "tag__remove-button",
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
    variant: {
      default: {
        base: "tag--default",
      },
      surface: {
        base: "tag--surface",
      },
    },
    isOnSurface: {
      true: {
        base: "tag--on-surface",
        removeButton: "tag__remove-button--on-surface",
      },
      false: {},
    },
  },
});

export type TagVariants = VariantProps<typeof tagVariants>;
