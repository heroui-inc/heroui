import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const radioGroupVariants = tv({
  base: "radio-group",
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
