import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {tooltipBase} from "../tooltip/tooltip.styles";

export const popoverVariants = tv({
  slots: {
    base: tooltipBase,
    dialog: "px-0 py-1",
    heading: "font-medium",
  },
});

export type PopoverVariants = VariantProps<typeof popoverVariants>;
