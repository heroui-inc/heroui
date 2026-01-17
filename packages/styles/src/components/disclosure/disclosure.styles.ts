import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const disclosureVariants = tv({
  defaultVariants: {},
  slots: {
    base: "disclosure",
    body: "disclosure__body",
    bodyInner: "disclosure__body-inner",
    content: "disclosure__content",
    heading: "disclosure__heading",
    indicator: "disclosure__indicator",
    trigger: "disclosure__trigger",
  },
  variants: {},
});

// Render props that should be excluded from DisclosureVariants (framework-specific)
type DisclosureRenderPropsKeys = "isExpanded" | "isDisabled" | "state";

export type DisclosureVariants = Omit<
  VariantProps<typeof disclosureVariants>,
  DisclosureRenderPropsKeys
>;
