import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const sliderVariants = tv({
  slots: {
    base: [
      "relative",
      "flex",
      "flex-col",
      "gap-1",
      "touch-none",
      "select-none",
      "w-full",
      "data-[orientation=vertical]:h-full",
      "data-[orientation=vertical]:w-auto",
      "data-[orientation=vertical]:flex-col",
    ],
    header: ["flex", "justify-between", "items-center", "mb-1"],
    label: ["text-sm", "font-medium", "text-gray-12"],
    output: ["text-sm", "text-gray-11", "tabular-nums"],
    track: [
      "relative",
      "bg-gray-5",
      "rounded-full",
      "grow",
      "cursor-interactive",
      "data-[disabled]:cursor-not-allowed",
      "data-[disabled]:opacity-50",
      // Horizontal
      "data-[orientation=horizontal]:w-full",
      "data-[orientation=horizontal]:h-1",
      // Vertical
      "data-[orientation=vertical]:h-full",
      "data-[orientation=vertical]:w-1",
    ],
    fill: [
      "absolute",
      "bg-gray-12",
      "rounded-full",
      "data-[disabled]:bg-gray-8",
      // Horizontal
      "data-[orientation=horizontal]:h-full",
      "data-[orientation=horizontal]:left-0",
      "data-[orientation=horizontal]:top-0",
      // Vertical
      "data-[orientation=vertical]:w-full",
      "data-[orientation=vertical]:bottom-0",
      "data-[orientation=vertical]:left-0",
    ],
    thumb: [
      "absolute",
      "rounded-full",
      "bg-white",
      "border-2",
      "border-gray-12",
      "shadow-sm",
      "cursor-grab",
      "data-[dragging]:cursor-grabbing",
      "data-[pressed]:scale-95",
      "data-[pressed]:shadow-none",
      "outline-none",
      "data-[focus-visible]:ring-2",
      "data-[focus-visible]:ring-gray-7",
      "data-[focus-visible]:ring-offset-2",
      "data-[focus-visible]:ring-offset-white",
      "data-[disabled]:cursor-not-allowed",
      "data-[disabled]:border-gray-8",
      "data-[disabled]:opacity-50",
      // Size
      "h-5",
      "w-5",
      // Position
      "data-[orientation=horizontal]:top-1/2",
      "data-[orientation=horizontal]:-translate-y-1/2",
      "data-[orientation=vertical]:left-1/2",
      "data-[orientation=vertical]:-translate-x-1/2",
      // Transition
      "transition-all",
      "duration-150",
    ],
    marks: ["flex", "justify-between", "mt-1", "text-xs", "text-gray-11"],
  },
  variants: {
    orientation: {
      horizontal: {},
      vertical: {
        base: "items-center",
      },
    },
    isDisabled: {
      true: {
        base: "cursor-not-allowed opacity-50",
        label: "text-gray-8",
        output: "text-gray-8",
        track: "bg-gray-4 cursor-not-allowed",
        fill: "bg-gray-8",
        thumb: "border-gray-8 cursor-not-allowed",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type SliderVariants = VariantProps<typeof sliderVariants>;
