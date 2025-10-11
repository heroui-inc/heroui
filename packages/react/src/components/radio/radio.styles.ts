import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const radioVariants = tv({
  slots: {
    base: "radio group",
    wrapper: "radio__wrapper",
    indicator: "radio__indicator",
  },
  variants: {
    size: {
      sm: {
        base: "radio--sm",
      },
      md: {
        base: "radio--md",
      },
      lg: {
        base: "radio--lg",
      },
    },
    isDisabled: {
      true: {
        base: "radio--disabled",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const radioGroupVariants = tv({
  slots: {
    base: "radio-group",
    items: "radio-group__items",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "radio-group--horizontal",
      },
      vertical: {
        base: "radio-group--vertical",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type RadioVariants = VariantProps<typeof radioVariants>;
export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
