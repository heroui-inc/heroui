import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tagVariants = tv({
  defaultVariants: {
    size: "md",
    variant: "default",
    selectedVariant: "default",
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
      "on-surface": {
        base: "tag--on-surface",
        removeButton: "tag__remove-button--on-surface",
      },
      "on-form-field": {
        base: "tag--on-form-field",
      },
    },
  },
});

export type TagVariants = VariantProps<typeof tagVariants>;
