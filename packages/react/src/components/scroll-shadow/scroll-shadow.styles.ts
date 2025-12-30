import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const scrollShadowVariants = tv({
  slots: {
    base: "scroll-shadow",
  },
  variants: {
    variant: {
      fade: {
        base: "scroll-shadow--fade",
      },
    },
    orientation: {
      vertical: {
        base: "scroll-shadow--vertical",
      },
      horizontal: {
        base: "scroll-shadow--horizontal",
      },
    },
    hideScrollBar: {
      true: {
        base: "scroll-shadow--hide-scrollbar",
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "fade",
    orientation: "vertical",
    hideScrollBar: false,
  },
});

export type ScrollShadowVariants = VariantProps<typeof scrollShadowVariants>;
