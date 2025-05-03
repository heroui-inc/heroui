import type {DisclosureRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRing} from "../../utils/compose";

export const accordionVariants = tv({
  slots: {
    base: "bg-panel w-full",
    body: "text-muted px-4 pb-4 pt-0",
    heading: "flex",
    indicator: "text-muted ml-auto size-4 shrink-0 transition duration-300",
    item: "border-b last:border-b-0",
    panel: "",
    trigger: [
      /* Focus State */
      focusRing,
      /* Base Styles */
      "hover:bg-base-subtle duration-50 flex flex-1 items-center justify-between px-4 py-4 text-left font-medium transition-[background-color]",
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
        base: "shadow-sm/5 rounded-lg border",
        item: "first:[&_[data-accordion-trigger]]:rounded-t-lg last:[&_[data-accordion-trigger]]:rounded-b-lg",
      },
    },
  },
});

export type AccordionVariants = Omit<
  VariantProps<typeof accordionVariants>,
  keyof DisclosureRenderProps
>;
