import type {DisclosureRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const disclosureVariants = tv({
  slots: {
    base: "disclosure",
    trigger: "disclosure__trigger",
    content: "disclosure__content",
  },
  variants: {},
  defaultVariants: {},
});

export type DisclosureVariants = Omit<
  VariantProps<typeof disclosureVariants>,
  keyof DisclosureRenderProps
>;
