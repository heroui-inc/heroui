import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputVariants = tv({
  base: "input",
  variants: {},
  defaultVariants: {},
});

export type InputVariants = VariantProps<typeof inputVariants>;
