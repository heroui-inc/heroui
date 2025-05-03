import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils/compose";

export const chipVariants = tv({
  base: [
    "inline-flex items-center gap-x-1.5 rounded-md border px-2 py-0.5 text-sm/5",
    "bg-base text-base-foreground font-medium transition-colors sm:text-xs/5",
    focusRingClasses,
  ],
  variants: {
    color: {
      danger: "text-danger",
      default: "",
      success: "text-success",
      warning: "text-warning",
    },
  },
});

export type ChipVariants = VariantProps<typeof chipVariants>;
