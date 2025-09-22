import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const disclosureGroupVariants = tv({
  slots: {
    base: "disclosure-group",
  },
  variants: {},
  defaultVariants: {},
});

export type DisclosureGroupVariants = VariantProps<typeof disclosureGroupVariants>;
