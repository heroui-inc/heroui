import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const formVariants = tv({
  slots: {
    base: ["flex", "flex-col"],
    section: ["space-y-4"],
    actions: ["flex", "items-center", "gap-2", "pt-4"],
  },
  variants: {
    isDisabled: {
      true: {
        base: ["opacity-50", "pointer-events-none"],
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export type FormVariants = VariantProps<typeof formVariants>;
