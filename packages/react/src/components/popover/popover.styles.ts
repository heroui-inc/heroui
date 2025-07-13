import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils";
import {tooltipBase} from "../tooltip/tooltip.styles";

export const popoverVariants = tv({
  slots: {
    base: [tooltipBase, "p-0"],
    dialog: ["p-3", focusRingClasses],
    heading: "font-medium",
    trigger: ["cursor-pointer", focusRingClasses],
  },
});

export type PopoverVariants = VariantProps<typeof popoverVariants>;
