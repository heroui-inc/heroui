import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const separatorVariants = tv({
  base: "separator",
  variants: {
    orientation: {
      horizontal: "separator--horizontal",
      vertical: "separator--vertical",
    },
    isOnSurface: {
      true: "separator--on-surface",
      false: {},
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    isOnSurface: false,
  },
});

export {separatorVariants};
export type SeparatorVariants = VariantProps<typeof separatorVariants>;
