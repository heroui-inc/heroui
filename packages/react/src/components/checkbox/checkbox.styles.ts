import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const checkboxVariants = tv({
  defaultVariants: {},
  slots: {
    base: "checkbox",
    icon: "checkbox-icon",
    wrapper: "checkbox-wrapper",
  },
  variants: {
    isDisabled: {
      true: {
        base: "cursor-not-allowed",
      },
    },
  },
});

export const checkboxGroupVariants = tv({
  defaultVariants: {
    orientation: "vertical",
  },
  slots: {
    base: "flex flex-col gap-2",
    items: "flex flex-col gap-2",
  },
  variants: {
    orientation: {
      horizontal: {
        items: "flex-row gap-4",
      },
      vertical: {
        items: "flex-col gap-2",
      },
    },
  },
});

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupVariants>;
