import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const separatorVariants = tv({
  base: "separator",
  variants: {
    orientation: {
      horizontal: "separator--horizontal",
      vertical: "separator--vertical",
    },
    variant: {
      default: "separator--default",
      secondary: "separator--secondary",
      tertiary: "separator--tertiary",
      quaternary: "separator--quaternary",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
});

export {separatorVariants};
export type SeparatorVariants = VariantProps<typeof separatorVariants>;
