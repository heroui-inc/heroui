import type {LinkRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const linkVariants = tv({
  slots: {
    base: "link",
    icon: "link__icon",
  },
  variants: {
    underline: {
      none: {
        base: "link--underline-none",
      },
      hover: {
        base: "link--underline-hover",
      },
      always: {
        base: "link--underline-always",
      },
    },
    underlineOffset: {
      1: {
        base: "link--offset-1",
      },
      2: {
        base: "link--offset-2",
      },
      3: {
        base: "link--offset-3",
      },
    },
  },
  defaultVariants: {
    underline: "hover",
    underlineOffset: 1,
  },
});

export type LinkVariants = Omit<VariantProps<typeof linkVariants>, keyof LinkRenderProps>;
