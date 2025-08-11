import type {LinkRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const linkVariants = tv({
  slots: {
    base: "link",
    icon: "",
  },
  variants: {
    showIcon: {
      true: {
        base: "inline-flex items-center gap-1",
      },
    },
    iconPlacement: {
      start: {
        icon: "order-first",
      },
      end: {
        icon: "order-last",
      },
    },
  },
  defaultVariants: {
    showIcon: false,
    iconPlacement: "end",
  },
});

export type LinkVariants = Omit<VariantProps<typeof linkVariants>, keyof LinkRenderProps>;