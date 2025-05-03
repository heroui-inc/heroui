/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils/compose";

export const chipVariants = tv({
  base: [
    "inline-flex items-center gap-x-1.5 rounded-md border px-2 py-0.5 text-sm/5",
    "bg-base font-medium transition-colors sm:text-xs/5",
    focusRingClasses,
  ],
  variants: {
    color: {
      accent: "text-accent",
      danger: "text-danger",
      base: "text-base-foreground",
      success: "text-success",
      warning: "text-warning",
    },
    variant: {
      primary: "border-transparent",
      secondary: "",
      tertiary: "bg-transparent",
    },
  },
  compoundVariants: [
    {
      className: "bg-accent text-accent-foreground",
      color: "accent",
      variant: "primary",
    },
    {
      className: "bg-success text-success-foreground",
      color: "success",
      variant: "primary",
    },
    {
      className: "bg-warning text-warning-foreground",
      color: "warning",
      variant: "primary",
    },
    {
      className: "bg-danger text-danger-foreground",
      color: "danger",
      variant: "primary",
    },
  ],
  defaultVariants: {
    color: "base",
    variant: "secondary",
  },
});

export type ChipVariants = VariantProps<typeof chipVariants>;
