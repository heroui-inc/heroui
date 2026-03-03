import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const badgeVariants = tv({
  defaultVariants: {
    color: "default",
    placement: "top-right",
    size: "md",
    variant: "primary",
  },
  slots: {
    anchor: "badge-anchor",
    base: "badge",
    label: "badge__label",
  },
  variants: {
    color: {
      accent: {
        base: "badge--accent",
      },
      danger: {
        base: "badge--danger",
      },
      default: {
        base: "badge--default",
      },
      success: {
        base: "badge--success",
      },
      warning: {
        base: "badge--warning",
      },
    },
    placement: {
      "bottom-left": {
        base: "badge--bottom-left",
      },
      "bottom-right": {
        base: "badge--bottom-right",
      },
      "top-left": {
        base: "badge--top-left",
      },
      "top-right": {
        base: "badge--top-right",
      },
    },
    size: {
      lg: {
        base: "badge--lg",
      },
      md: {
        base: "badge--md",
      },
      sm: {
        base: "badge--sm",
      },
    },
    variant: {
      primary: {
        base: "badge--primary",
      },
      secondary: {
        base: "badge--secondary",
      },
      soft: {
        base: "badge--soft",
      },
    },
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
