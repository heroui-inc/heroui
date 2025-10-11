import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const radioGroupVariants = tv({
  base: "radio-group",
});

export const radioVariants = tv({
  slots: {
    base: "radio",
    control: "radio__control",
    indicator: "radio__indicator",
    content: "radio__content",
  },
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
export type RadioVariants = VariantProps<typeof radioVariants>;
