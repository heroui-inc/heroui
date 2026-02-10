import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const accordionVariants = tv({
  slots: {
    base: "accordion",
    body: "accordion__body",
    bodyInner: "accordion__body-inner",
    heading: "accordion__heading",
    indicator: "accordion__indicator",
    item: "accordion__item",
    panel: "accordion__panel",
    trigger: "accordion__trigger",
  },
  variants: {
    variant: {
      default: {},
      surface: {
        base: "accordion--surface",
      },
    },
  },
});

// Render props that should be excluded from AccordionVariants (framework-specific)
type DisclosureRenderPropsKeys = "isExpanded" | "isDisabled" | "state";

export type AccordionVariants = Omit<
  VariantProps<typeof accordionVariants>,
  DisclosureRenderPropsKeys
>;
