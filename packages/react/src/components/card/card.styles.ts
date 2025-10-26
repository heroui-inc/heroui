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
      default: {
        base: "card--default",
      },
      subtle: {
        base: "card--subtle",
      },
      emphasis: {
        base: "card--emphasis",
      },
      strong: {
        base: "card--strong",
      },
      panel: {
        base: "card--panel",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export {cardVariants};
export type CardVariants = VariantProps<typeof cardVariants>;
