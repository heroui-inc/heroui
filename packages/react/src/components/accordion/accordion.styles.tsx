import type {DisclosureRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const accordionVariants = tv({
  slots: {
    base: "w-full",
    chevron: "ml-auto size-4 shrink-0 transition duration-300",
    content: "text-muted",
    heading: "flex",
    innerContent: "pb-4 pt-0",
    item: "border-b last:border-b-0",
    trigger: [
      "hover:bg-base-subtle flex flex-1 items-center justify-between py-4 font-medium transition-all",
      "[&[aria-expanded=true]_[data-slot=accordion-chevron]]:-rotate-180",
    ],
  },
  variants: {},
});

const {base, chevron, content, heading, innerContent, item, trigger} = accordionVariants();

export const slots = {
  base,
  chevron,
  content,
  heading,
  innerContent,
  item,
  trigger,
};

export type AccordionVariants = Omit<
  VariantProps<typeof accordionVariants>,
  keyof DisclosureRenderProps
>;
