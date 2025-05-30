import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils/compose";

export const alertVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    action: ["rounded-lg px-3.5 py-2 text-sm", focusRingClasses],
    base: [
      "bg-base w-full rounded-lg",
      "border-foreground/10 border",
      "flex flex-row items-center justify-start gap-4 p-4",
    ],
    close: ["text-muted h-fit p-1", focusRingClasses],
    content: ["flex-grow"],
    description: ["text-muted text-sm"],
    icon: ["flex items-center justify-center"],
    title: ["text-sm font-medium"],
  },
  variants: {
    variant: {
      danger: {
        action: ["bg-danger text-danger-foreground"],
        icon: ["text-danger"],
        title: ["text-danger"],
      },
      default: {
        action: ["bg-accent-soft text-accent-soft-foreground"],
        icon: ["text-foreground"],
        title: ["text-foreground"],
      },
      success: {
        action: ["bg-success text-success-foreground"],
        icon: ["text-success"],
        title: ["text-success"],
      },
      warning: {
        action: ["bg-warning text-warning-foreground"],
        icon: ["text-warning"],
        title: ["text-warning"],
      },
    },
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
