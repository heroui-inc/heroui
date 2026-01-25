import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const separatorVariants = tv({
  base: "separator",
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
  variants: {
    orientation: {
      horizontal: "separator--horizontal",
      vertical: "separator--vertical",
    },
    variant: {
      default: "separator--default",
      secondary: "separator--secondary",
      tertiary: "separator--tertiary",
    },
  },
});

export {separatorVariants};
export type SeparatorVariants = VariantProps<typeof separatorVariants>;
