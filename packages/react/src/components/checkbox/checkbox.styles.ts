import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const checkboxGroupVariants = tv({
  base: "checkbox-group",
});

export const checkboxVariants = tv({
  slots: {
    base: "checkbox",
    control: "checkbox__control",
    indicator: "checkbox__indicator",
    content: "checkbox__content",
  },
});

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupVariants>;
export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
