import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const stackedMeterVariants = tv({
  defaultVariants: {
    size: "md",
  },
  slots: {
    base: "stacked-meter",
    legend: "stacked-meter__legend",
    legendItem: "stacked-meter__legend-item",
    legendLabel: "stacked-meter__legend-label",
    legendSwatch: "stacked-meter__legend-swatch",
    output: "stacked-meter__output",
    segment: "stacked-meter__segment",
    track: "stacked-meter__track",
  },
  variants: {
    size: {
      lg: {
        base: "stacked-meter--lg",
      },
      md: {
        base: "stacked-meter--md",
      },
      sm: {
        base: "stacked-meter--sm",
      },
    },
  },
});

export type StackedMeterVariants = VariantProps<typeof stackedMeterVariants>;
