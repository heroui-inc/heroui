import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textFieldVariants = tv({
  base: "text-field",
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;
