import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const separatorVariants = tv({
  base: "separator",
  variants: {
    orientation: {
      horizontal: "separator--horizontal",
      vertical: "separator--vertical",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export {separatorVariants};
export type SeparatorVariants = VariantProps<typeof separatorVariants>;
