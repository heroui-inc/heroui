import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const checkboxVariants = tv({
  slots: {
    base: "checkbox",
    control: "checkbox__control",
    indicator: "checkbox__indicator",
    content: "checkbox__content",
  },
  variants: {
    inSurface: {
      default: {
        base: "checkbox--in-surface-default",
      },
      secondary: {
        base: "checkbox--in-surface-secondary",
      },
      tertiary: {
        base: "checkbox--in-surface-tertiary",
      },
    },
  },
  defaultVariants: {},
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
