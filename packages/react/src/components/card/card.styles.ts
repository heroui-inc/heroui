import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const cardVariants = tv({
  slots: {
    base: "card",
    header: "card__header",
    title: "card__title",
    description: "card__description",
    content: "card__content",
    footer: "card__footer",
  },
  variants: {
    variant: {
      transparent: {
        base: "card--transparent",
      },
      default: {
        base: "card--default",
      },
      secondary: {
        base: "card--secondary",
      },
      tertiary: {
        base: "card--tertiary",
      },
      quaternary: {
        base: "card--quaternary",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export {cardVariants};
export type CardVariants = VariantProps<typeof cardVariants>;
