import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const dateFieldVariants = tv({
  base: "date-field",
});

export type DateFieldVariants = VariantProps<typeof dateFieldVariants>;
