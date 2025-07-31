import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const checkboxVariants = tv({
  defaultVariants: {},
  slots: {
    base: "cursor-interactive group flex items-center gap-3",
    icon: [
      "h-3 w-3",
      "text-accent-foreground",
      "scale-0 opacity-0",
      "transition-all duration-200",
      "group-data-[selected=true]:scale-100 group-data-[selected=true]:opacity-100",
      "group-data-[indeterminate=true]:scale-100 group-data-[indeterminate=true]:opacity-100",
    ],
    wrapper: [
      "relative inline-flex h-4 w-4 shrink-0 items-center justify-center",
      "rounded-[5px]",
      "transition-all duration-200",
      "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]",

      // Default unselected state
      "bg-default border-border/10 border",

      // Hover state - unselected
      "group-data-[hovered=true]:group-data-[selected=false]:border-accent-hover",
      "group-data-[hovered=true]:group-data-[indeterminate=false]:border-accent-hover",

      // Pressed state
      "group-data-[pressed=true]:scale-[0.97]",

      // Selected/Indeterminate states
      "group-data-[selected=true]:bg-accent group-data-[selected=true]:border-accent-hover group-data-[selected=true]:border-[0.5px]",
      "group-data-[indeterminate=true]:bg-accent group-data-[indeterminate=true]:border-accent-hover group-data-[indeterminate=true]:border-[0.5px]",

      // Hover state - selected
      "group-data-[hovered=true]:group-data-[selected=true]:bg-accent-hover",
      "group-data-[hovered=true]:group-data-[indeterminate=true]:bg-accent-hover",

      // Focus state
      "group-data-[focus-visible=true]:border-2",
      "group-data-[focus-visible=true]:shadow-[0px_0px_0px_3px_rgba(0,0,0,0.30),0px_0px_0px_0.5px_rgba(0,0,0,0.05)]",

      // Error state - unselected
      "group-data-[invalid=true]:group-data-[selected=false]:border-danger",
      "group-data-[invalid=true]:group-data-[indeterminate=false]:border-danger",

      // Error state - selected
      "group-data-[invalid=true]:group-data-[selected=true]:bg-danger group-data-[invalid=true]:group-data-[selected=true]:border-danger group-data-[invalid=true]:group-data-[selected=true]:border-[0.5px]",
      "group-data-[invalid=true]:group-data-[indeterminate=true]:bg-danger group-data-[invalid=true]:group-data-[indeterminate=true]:border-danger group-data-[invalid=true]:group-data-[indeterminate=true]:border-[0.5px]",

      // Disabled state
      "group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:opacity-50",
    ],
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
