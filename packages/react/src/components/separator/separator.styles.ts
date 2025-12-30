import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const separatorVariants = tv({
  base: "separator",
  variants: {
    orientation: {
      horizontal: "separator--horizontal",
      vertical: "separator--vertical",
    },
    inSurface: {
      default: "separator--in-surface-default",
      secondary: "separator--in-surface-secondary",
      tertiary: "separator--in-surface-tertiary",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    inSurface: undefined,
  },
});

export {separatorVariants};
export type SeparatorVariants = VariantProps<typeof separatorVariants>;
