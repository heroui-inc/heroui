import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const cardVariants = tv({
  slots: {
    base: "card",
    header: "card__header",
    title: "card__title",
    description: "card__description",
    content: "card__content",
    details: "card__details",
    footer: "card__footer",
    image: "card__image",
    closeButton: "card__close-button",
  },
  variants: {
    surface: {
      none: {
        base: "card--surface-none",
      },
      "1": {
        base: "card--surface-1",
      },
      "2": {
        base: "card--surface-2",
      },
      "3": {
        base: "card--surface-3",
      },
    },
    variant: {
      side: {
        base: "card--side",
        image: "card__image--side",
        header: "card__header--side",
        content: "card__content--side",
        details: "card__details--side",
        footer: "card__footer--side",
      },
      item: {
        base: "card--item",
        image: "card__image--item",
        details: "card__details--item",
        footer: "card__footer--item",
      },
      full: {
        base: "card--full",
        image: "card__image--full",
        header: "card__header--full",
        content: "card__content--full",
        details: "card__details--full",
        footer: "card__footer--full",
      },
    },
  },
  defaultVariants: {
    surface: "1",
  },
});

export {cardVariants};
export type CardVariants = VariantProps<typeof cardVariants>;
