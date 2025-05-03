import type {LinkRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {ariaDisabledClasses, focusRingClasses} from "../../utils/compose";

export const linkVariants = tv({
  base: [
    "text-link relative inline-flex cursor-pointer items-center gap-1",
    "decoration-muted underline-offset-4 transition-all hover:underline",
    focusRingClasses,
    ariaDisabledClasses,
  ],
});

export type LinkVariants = Omit<VariantProps<typeof linkVariants>, keyof LinkRenderProps>;
