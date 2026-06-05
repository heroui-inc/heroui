import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const radioVariants = tv({
  slots: {
    base: "radio",
    button: "radio__button",
    control: "radio__control",
    indicator: "radio__indicator",
  },
});

export type RadioVariants = VariantProps<typeof radioVariants>;
