import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const switchVariants = tv({
  slots: {
    base: "switch",
    control: "switch__control",
    thumb: "switch__thumb",
    icon: "switch__icon",
  },
  variants: {
    size: {
      sm: {
        base: "switch--sm",
      },
      md: {
        base: "switch--md",
      },
      lg: {
        base: "switch--lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SwitchVariants = VariantProps<typeof switchVariants>;
