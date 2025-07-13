import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {disabledClasses, focusRingClasses} from "../../utils/compose";

export const alertVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    action: [
      "select-none rounded-lg px-3.5 py-2 text-sm font-medium",
      "transition-colors duration-150",
      "cursor-pointer",
      focusRingClasses,
      disabledClasses,
    ],
    base: [
      "bg-panel w-full rounded-lg",
      "flex flex-row items-center justify-start gap-4 p-4",
      "border-foreground/10 border",
    ],
    close: [
      "text-muted h-fit rounded-sm p-1",
      "transition-colors duration-150",
      "hover:bg-base active:bg-base data-[pressed]:bg-base",
      "hover:text-foreground active:text-foreground data-[pressed]:text-foreground",
      "cursor-pointer",
      focusRingClasses,
      disabledClasses,
    ],
    content: "flex-grow",
    description: "text-muted text-sm",
    icon: "flex select-none items-center justify-center",
    title: "text-sm font-medium",
  },
  variants: {
    variant: {
      danger: {
        action: [
          "bg-danger text-danger-foreground",
          "hover:bg-danger-hover active:bg-danger-hover data-[pressed]:bg-danger-hover",
        ],
        icon: "text-danger",
        title: "text-danger",
      },
      default: {
        action: [
          "bg-accent-soft text-accent-soft-foreground",
          "hover:bg-accent-soft-hover active:bg-accent-soft-hover data-[pressed]:bg-accent-soft-hover",
        ],
        icon: "text-foreground",
        title: "text-foreground",
      },
      success: {
        action: [
          "bg-success text-success-foreground",
          "hover:bg-success-hover active:bg-success-hover data-[pressed]:bg-success-hover",
        ],
        icon: "text-success",
        title: "text-success",
      },
      warning: {
        action: [
          "bg-warning text-warning-foreground",
          "hover:bg-warning-hover active:bg-warning-hover data-[pressed]:bg-warning-hover",
        ],
        icon: "text-warning",
        title: "text-warning",
      },
    },
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
