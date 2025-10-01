import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const fieldsetVariants = tv({
  base: "fieldset",
});

export const legendVariants = tv({
  base: "legend",
});

export const fieldGroupVariants = tv({
  base: "field-group",
  variants: {
    spacing: {
      sm: "field-group--sm",
      md: "field-group--md",
      lg: "field-group--lg",
    },
  },
  defaultVariants: {
    spacing: "lg",
  },
});

export const fieldVariants = tv({
  base: "field",
  variants: {
    variant: {
      default: "",
      checkbox: "field--checkbox",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const fieldErrorVariants = tv({
  base: "field-error",
});

export type FieldsetVariants = VariantProps<typeof fieldsetVariants>;
export type LegendVariants = VariantProps<typeof legendVariants>;
export type FieldGroupVariants = VariantProps<typeof fieldGroupVariants>;
export type FieldVariants = VariantProps<typeof fieldVariants>;
export type FieldErrorVariants = VariantProps<typeof fieldErrorVariants>;
