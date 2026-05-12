import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textVariants = tv({
  defaultVariants: {
    align: "start",
    color: "default",
    type: "body",
  },
  slots: {
    base: "text",
    prose: "text-prose",
  },
  variants: {
    align: {
      center: "text--align-center",
      end: "text--align-end",
      justify: "text--align-justify",
      start: "text--align-start",
    },
    color: {
      default: "text--color-default",
      muted: "text--color-muted",
    },
    truncate: {
      true: "text--truncate",
    },
    type: {
      body: "text--body",
      "body-sm": "text--body-sm",
      "body-xs": "text--body-xs",
      code: "text--code",
      h1: "text--h1",
      h2: "text--h2",
      h3: "text--h3",
      h4: "text--h4",
      h5: "text--h5",
      h6: "text--h6",
    },
    weight: {
      bold: "text--weight-bold",
      medium: "text--weight-medium",
      normal: "text--weight-normal",
      semibold: "text--weight-semibold",
    },
  },
});

export type TextVariants = VariantProps<typeof textVariants>;
