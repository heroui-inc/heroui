import type {DisclosureRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const accordionVariants = tv({
  slots: {
    base: "w-full",
    body: "text-muted px-4 pb-4 pt-0",
    content: "",
    heading: "flex",
    indicator: "text-muted ml-auto size-4 shrink-0 transition duration-300",
    item: "border-b last:border-b-0",
    trigger: [
      "hover:bg-base-subtle duration-50 flex flex-1 items-center justify-between px-4 py-4 font-medium transition-[background-color]",
      /* Expanded State */
      "[&[aria-expanded=true]_[data-slot=accordion-indicator]]:-rotate-180",
      /* Disabled State */
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]",
      /* Focus State */
      "focus-visible:ring-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    ],
  },
  variants: {
    variant: {
      default: {},
      outline: {
        // TODO: fix accordion trigger selection
        base: "shadow-sm/5 [data-slot=accordion-trigger]:first:rounded-t-lg [data-slot=accordion-trigger]:last:rounded-b-lg rounded-lg border",
      },
    },
  },
});

export const slots = accordionVariants();

export type AccordionVariants = Omit<
  VariantProps<typeof accordionVariants>,
  keyof DisclosureRenderProps
>;
