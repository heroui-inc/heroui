import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const listboxSectionVariants = tv({
  base: "list-box-section",
});

export type ListBoxSectionVariants = VariantProps<typeof listboxSectionVariants>;
