import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const buttonGroupVariants = tv({
  base: "button-group",
});

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
