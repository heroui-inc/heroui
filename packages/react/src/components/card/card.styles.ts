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
      flat: {
        base: "card--variant-flat",
      },
      outlined: {
        base: "card--variant-outlined",
      },
      elevated: {
        base: "card--variant-elevated",
      },
      filled: {
        base: "card--variant-filled",
      },
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
});

export {cardVariants};
export type CardVariants = VariantProps<typeof cardVariants>;
