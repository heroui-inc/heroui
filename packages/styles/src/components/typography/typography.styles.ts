import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const typographyVariants = tv({
  defaultVariants: {
    align: "start",
    color: "default",
    type: "body",
  },
  slots: {
    base: "typography",
    prose: "typography-prose",
  },
  variants: {
    align: {
      center: "typography--align-center",
      end: "typography--align-end",
      justify: "typography--align-justify",
      start: "typography--align-start",
    },
    color: {
      default: "typography--color-default",
      muted: "typography--color-muted",
    },
    truncate: {
      true: "typography--truncate",
    },
    type: {
      body: "typography--body",
      "body-sm": "typography--body-sm",
      "body-xs": "typography--body-xs",
      code: "typography--code",
      h1: "typography--h1",
      h2: "typography--h2",
      h3: "typography--h3",
      h4: "typography--h4",
      h5: "typography--h5",
      h6: "typography--h6",
    },
    weight: {
      bold: "typography--weight-bold",
      medium: "typography--weight-medium",
      normal: "typography--weight-normal",
      semibold: "typography--weight-semibold",
    },
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;
