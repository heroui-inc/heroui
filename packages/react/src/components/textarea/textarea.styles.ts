import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textAreaVariants = tv({
  base: "textarea",
  variants: {},
  defaultVariants: {},
});

export type TextAreaVariants = VariantProps<typeof textAreaVariants>;
