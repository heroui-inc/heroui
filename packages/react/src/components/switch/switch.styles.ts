import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils/compose";

export const switchVariants = tv({
  slots: {
    base: "cursor-interactive group inline-flex items-center gap-3",
    control: [
      "relative inline-flex h-6 w-11 shrink-0 items-center",
      "rounded-full border-2",
      "transition-all duration-200",
      focusRingClasses,
      // Default (off) state
      "border-muted-foreground/30 bg-muted-foreground/20",
      // Hover state (off)
      "group-data-[hovered=true]:border-muted-foreground/40 group-data-[hovered=true]:bg-muted-foreground/30",
      // Pressed state
      "group-data-[pressed=true]:scale-[0.97]",
      // Selected (on) state
      "group-data-[selected=true]:border-accent group-data-[selected=true]:bg-accent",
      // Hover state (on)
      "group-data-[selected=true]:group-data-[hovered=true]:border-accent-hover group-data-[selected=true]:group-data-[hovered=true]:bg-accent-hover",
      // Focus state
      "group-data-[focused=true]:border-foreground/60",
      "group-data-[focus-visible=true]:border-foreground/60",
      // Disabled state
      "group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:opacity-[var(--disabled-opacity)]",
      "group-data-[disabled=true]:group-data-[hovered=true]:border-muted-foreground/30",
    ],
    thumb: [
      "absolute left-0.5 block h-4 w-4",
      "rounded-full bg-white",
      "shadow-sm",
      "transition-transform duration-200",
      // Selected (on) state - move thumb to right
      "group-data-[selected=true]:translate-x-5",
      // Pressed state
      "group-data-[pressed=true]:w-5 group-data-[selected=true]:group-data-[pressed=true]:translate-x-4",
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

export const switchGroupVariants = tv({
  slots: {
    base: "flex flex-col gap-4",
    items: "flex flex-col gap-3",
  },
  variants: {
    orientation: {
      horizontal: {
        items: "flex-row gap-6",
      },
      vertical: {
        items: "flex-col gap-3",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type SwitchGroupVariants = VariantProps<typeof switchGroupVariants>;
