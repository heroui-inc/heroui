import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const menuSectionVariants = tv({
  base: "menu-section",
});

export type MenuSectionVariants = VariantProps<typeof menuSectionVariants>;
