import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const fieldErrorVariants = tv({
  base: "field-error",
});

export type FieldErrorVariants = VariantProps<typeof fieldErrorVariants>;
