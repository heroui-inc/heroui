import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const cardVariants = tv({
  slots: {
    base: [
      "relative",
      "overflow-hidden",
      "rounded-panel",
      "border",
      "border-border",
      "bg-surface-1",
      "shadow-border",
    ],
    header: ["flex", "flex-col", "gap-1", "p-6"],
    title: ["text-base", "font-medium", "leading-6", "text-foreground"],
    description: ["text-sm", "text-muted", "leading-5"],
    content: ["p-6", "pt-0"],
    footer: ["flex", "items-center", "p-6", "pt-0"],
    image: ["w-full", "object-cover"],
  },
  variants: {
    surface: {
      "1": {
        base: "bg-surface-1",
      },
      "2": {
        base: "bg-surface-2",
      },
      "3": {
        base: "bg-surface-3",
      },
    },
  },
  defaultVariants: {
    surface: "1",
  },
});

export {cardVariants};
export type CardVariants = VariantProps<typeof cardVariants>;
