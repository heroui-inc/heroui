import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const listboxVariants = tv({
  slots: {
    base: "relative w-full min-w-[250px] max-w-[360px]",
    item: [
      "cursor-interactive group relative flex min-h-9 w-full items-center gap-3 rounded-xl px-2 py-1.5",
      "outline-none transition-colors",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[focused]:outline-none",
      "data-[focus-visible]:ring-2",
      "data-[focus-visible]:ring-offset-2",
      "data-[focus-visible]:ring-offset-white",
    ],
    itemIndicator: ["shrink-0 opacity-0 transition-opacity", "data-[visible]:opacity-100"],
  },
  variants: {
    variant: {
      initial: {
        item: [
          "hover:bg-[#f5f5f5]",
          "data-[focused]:ring-2 data-[focused]:ring-[#0000001a] data-[focused]:ring-offset-1",
          "data-[selected]:bg-[#f5f5f5]",
        ],
      },
      danger: {
        item: [
          "hover:bg-[#e44c3d]/10",
          "data-[focused]:ring-2 data-[focused]:ring-[#e44c3d]/20 data-[focused]:ring-offset-1",
          "data-[selected]:bg-[#e44c3d]/10 data-[selected]:text-[#e44c3d]",
        ],
        itemIndicator: "text-[#e44c3d]",
      },
    },
  },
  defaultVariants: {
    variant: "initial",
  },
});

export type ListBoxVariants = VariantProps<typeof listboxVariants>;
