import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tagVariants = tv({
  defaultVariants: {
    size: "md",
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
      "on-form-field": {
        base: "tag--on-form-field",
      },
    },
    inSurface: {
      default: {
        base: "tag--in-surface-default",
        removeButton: "tag__remove-button--in-surface-default",
      },
      secondary: {
        base: "tag--in-surface-secondary",
        removeButton: "tag__remove-button--in-surface-secondary",
      },
      tertiary: {
        base: "tag--in-surface-tertiary",
        removeButton: "tag__remove-button--in-surface-tertiary",
      },
    },
  },
});

export type TagVariants = VariantProps<typeof tagVariants>;
