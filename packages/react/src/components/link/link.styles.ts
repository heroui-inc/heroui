import type {LinkRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const linkVariants = tv({
  base: "link",
});

export type LinkVariants = Omit<VariantProps<typeof linkVariants>, keyof LinkRenderProps>;
