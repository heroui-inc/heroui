import type {DisclosureRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils/compose";

export const accordionVariants = tv({
  slots: {
    base: "w-full",
    body: "text-muted px-4 pb-4 pt-0",
    heading: "flex",
    indicator: "text-muted ml-auto size-4 shrink-0 transition duration-300",
    item: "border-b last:border-b-0",
    panel:
      "h-0 opacity-0 transition-[height,opacity] duration-300 ease-out [&[aria-hidden=false]]:h-[var(--panel-height)] [&[aria-hidden=false]]:opacity-100",
    trigger: [
      /* Focus State */
      focusRingClasses,
      /* Base Styles */
      "hover:bg-base duration-50 flex flex-1 cursor-pointer items-center justify-between px-4 py-4 text-left font-medium transition-[background-color]",
      /* Expanded State */
      "[&[aria-expanded=true]_[data-accordion-indicator]]:-rotate-180",
      /* Disabled State */
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]",
    ],
  },
  variants: {
    variant: {
      default: {},
      outline: {
        base: "bg-panel shadow-sm/5 rounded-lg border",
        item: "first:[&_[data-accordion-trigger]]:rounded-t-lg last:[&_[data-accordion-trigger]]:rounded-b-lg",
      },
    },
  },
});

export type AccordionVariants = Omit<
  VariantProps<typeof accordionVariants>,
  keyof DisclosureRenderProps
>;
