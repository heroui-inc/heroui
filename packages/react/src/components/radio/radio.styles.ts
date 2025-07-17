import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils/compose";

export const radioVariants = tv({
  slots: {
    base: "cursor-interactive group flex items-center gap-3",
    wrapper: [
      "relative inline-flex h-4 w-4 shrink-0 items-center justify-center",
      "rounded-full border-2",
      "transition-all duration-200",
      focusRingClasses,
      // Default state
      "border-muted-foreground/50 bg-transparent",
      // Hover state
      "group-data-[hovered=true]:border-foreground/70",
      // Pressed state
      "group-data-[pressed=true]:scale-[0.97]",
      // Selected state
      "group-data-[selected=true]:border-accent",
      // Focus state (both focused and focus-visible)
      "group-data-[focused=true]:border-foreground",
      "group-data-[focus-visible=true]:border-foreground",
      // Invalid/Error state
      "group-data-[invalid=true]:border-danger",
      "group-data-[invalid=true]:group-data-[selected=true]:border-danger",
      // Disabled state
      "group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:opacity-[var(--disabled-opacity)]",
      "group-data-[disabled=true]:group-data-[hovered=true]:border-muted-foreground/50",
    ],
    indicator: [
      "absolute inset-0 m-auto h-1.5 w-1.5",
      "bg-accent rounded-full",
      "scale-0 opacity-0",
      "transition-all duration-200",
      // Selected state
      "group-data-[selected=true]:scale-100 group-data-[selected=true]:opacity-100",
      // Error state indicator color
      "group-data-[invalid=true]:bg-danger",
    ],
    label: [
      "text-foreground select-none",
      "transition-colors duration-200",
      "group-data-[disabled=true]:opacity-[var(--disabled-opacity)]",
    ],
  },
  variants: {
    isDisabled: {
      true: {
        base: "cursor-not-allowed",
      },
    },
  },
  defaultVariants: {},
});

export const radioGroupVariants = tv({
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
  defaultVariants: {
    orientation: "vertical",
  },
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
