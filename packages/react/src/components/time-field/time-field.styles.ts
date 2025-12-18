import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const timeFieldVariants = tv({
  base: "time-field",
});

export type TimeFieldVariants = VariantProps<typeof timeFieldVariants>;
