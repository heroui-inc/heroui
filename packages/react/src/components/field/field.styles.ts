import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const fieldsetVariants = tv({
  base: "fieldset",
});

export const legendVariants = tv({
  base: "legend",
});

export const fieldVariants = tv({
  base: "field",
});

export const fieldGroupVariants = tv({
  base: "field-group",
});

export const fieldErrorVariants = tv({
  base: "field-error",
});

export const labelVariants = tv({
  base: "label",
  variants: {
    isRequired: {
      true: "label--required",
    },
    isDisabled: {
      true: "label--disabled",
    },
  },
  defaultVariants: {
    isRequired: false,
    isDisabled: false,
  },
});

export const descriptionVariants = tv({
  base: "description",
  variants: {
    isDisabled: {
      true: "description--disabled",
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export type FieldsetVariants = VariantProps<typeof fieldsetVariants>;
export type LegendVariants = VariantProps<typeof legendVariants>;
export type FieldVariants = VariantProps<typeof fieldVariants>;
export type FieldGroupVariants = VariantProps<typeof fieldGroupVariants>;
export type FieldErrorVariants = VariantProps<typeof fieldErrorVariants>;
export type LabelVariants = VariantProps<typeof labelVariants>;
export type DescriptionVariants = VariantProps<typeof descriptionVariants>;
