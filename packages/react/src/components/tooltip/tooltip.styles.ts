import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tooltipVariants = tv({
  base: [
    "bg-panel shadow-md/5 group rounded-lg border px-3 py-1 text-sm will-change-transform dark:shadow-none",
    /* Entering */
    // base
    "animate-in zoom-in-95 fade-in-0 duration-150 ease-out",
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
    "data-exiting:animate-out data-exiting:fade-out data-exiting:duration-100",
    /* Arrow */
    "[&_[data-tooltip-arrow]]:fill-panel [&_[data-tooltip-arrow]]:stroke-border",
    "[&[data-placement=bottom]_[data-tooltip-arrow]]:rotate-180 [&[data-placement=left]_[data-tooltip-arrow]]:-rotate-90 [&[data-placement=right]_[data-tooltip-arrow]]:rotate-90",
  ],
});

export type TooltipVariants = VariantProps<typeof tooltipVariants>;
