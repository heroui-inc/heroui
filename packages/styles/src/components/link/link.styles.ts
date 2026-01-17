import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const linkVariants = tv({
  slots: {
    base: "link",
    icon: "link__icon",
  },
});

// Render props that should be excluded from LinkVariants (framework-specific)
type LinkRenderPropsKeys =
  | "isCurrent"
  | "isHovered"
  | "isPressed"
  | "isFocused"
  | "isFocusVisible"
  | "isDisabled";

export type LinkVariants = Omit<VariantProps<typeof linkVariants>, LinkRenderPropsKeys>;
