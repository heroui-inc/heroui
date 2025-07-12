import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils";

export const tooltipBase = [
  "bg-panel shadow-md/5 group rounded-lg border px-3 py-1 text-sm will-change-transform dark:shadow-none",
  /* Entering */
  // base
  "animate-in zoom-in-90 fade-in-0 duration-200 ease-in-out",
  // top
  "data-entering:data-[placement=top]:slide-in-from-bottom-1",
  // bottom
  "data-entering:data-[placement=bottom]:slide-in-from-top-1",
  // left
  "data-entering:data-[placement=left]:slide-in-from-right-1",
  // right
  "data-entering:data-[placement=right]:slide-in-from-left-1",
  /* Exiting */
  // base
  "data-exiting:animate-out data-exiting:fade-out data-exiting:zoom-out-95 data-exiting:duration-150 data-exiting:ease-out",
  /* Arrow */
  "[&_[data-overlay-arrow]]:fill-panel [&_[data-overlay-arrow]]:stroke-border",
  "[&[data-placement=bottom]_[data-overlay-arrow]]:rotate-180 [&[data-placement=left]_[data-overlay-arrow]]:-rotate-90 [&[data-placement=right]_[data-overlay-arrow]]:rotate-90",
];

export const tooltipVariants = tv({
  slots: {
    base: tooltipBase,
    trigger: [focusRingClasses],
  },
});

export type TooltipVariants = VariantProps<typeof tooltipVariants>;
