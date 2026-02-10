import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const disclosureGroupVariants = tv({
  defaultVariants: {},
  slots: {
    base: "disclosure-group",
  },
  variants: {},
});

export type DisclosureGroupVariants = VariantProps<typeof disclosureGroupVariants>;
