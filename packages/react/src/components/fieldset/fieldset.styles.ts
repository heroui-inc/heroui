import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const fieldsetVariants = tv({
  base: ["space-y-6", "[&>*+[data-slot=control]]:mt-6", "*:data-[slot=text]:mt-1"],
});

export const legendVariants = tv({
  base: ["text-base font-semibold", "text-foreground", "disabled:opacity-50"],
});

export const fieldGroupVariants = tv({
  base: "space-y-8 data-[slot=control]:block",
  variants: {
    spacing: {
      sm: "space-y-4",
      md: "space-y-6",
      lg: "space-y-8",
    },
  },
  defaultVariants: {
    spacing: "lg",
  },
});

export const fieldVariants = tv({
  base: [
    "[&>[data-slot=label]+[data-slot=control]]:mt-3",
    "[&>[data-slot=label]+[data-slot=description]]:mt-1",
    "[&>[data-slot=description]+[data-slot=control]]:mt-3",
    "[&>[data-slot=control]+[data-slot=description]]:mt-3",
    "[&>[data-slot=control]+[data-slot=error]]:mt-3",
    "*:data-[slot=label]:font-medium",
  ],
  variants: {
    variant: {
      default: "",
      checkbox: [
        "flex items-start gap-3",
        "[&>[data-slot=label]]:mt-0",
        "[&>[data-slot=control]]:mt-0.5",
        "[&>[data-slot=control]+[data-slot=label]]:mt-0",
        "[&>[data-slot=control]+div]:flex",
        "[&>[data-slot=control]+div]:flex-col",
        "[&>[data-slot=control]+div]:gap-1",
        "[&_[data-slot=label]]:font-normal",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const fieldErrorVariants = tv({
  base: [
    "text-destructive text-sm",
    "mt-1",
    "transition-all duration-200",
    "opacity-0",
    "translate-y-[-4px]",
    "data-[visible=true]:opacity-100",
    "data-[visible=true]:translate-y-0",
  ],
});

export type FieldsetVariants = VariantProps<typeof fieldsetVariants>;
export type LegendVariants = VariantProps<typeof legendVariants>;
export type FieldGroupVariants = VariantProps<typeof fieldGroupVariants>;
export type FieldVariants = VariantProps<typeof fieldVariants>;
export type FieldErrorVariants = VariantProps<typeof fieldErrorVariants>;
