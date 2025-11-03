import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const listboxSectionVariants = tv({
  base: "listbox-section",
});

export type ListBoxSectionVariants = VariantProps<typeof listboxSectionVariants>;
