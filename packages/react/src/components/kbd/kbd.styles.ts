import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const kbdVariants = tv({
  slots: {
    base: "kbd",
    abbr: "kbd__abbr",
    content: "kbd__content",
  },
  defaultVariants: {},
  variants: {
    variant: {
      default: "kbd--default",
      light: "kbd--light",
    },
  },
});

export type KbdVariants = VariantProps<typeof kbdVariants>;
