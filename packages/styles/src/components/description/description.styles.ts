import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const descriptionVariants = tv({
  base: "description",
});

export type DescriptionVariants = VariantProps<typeof descriptionVariants>;
