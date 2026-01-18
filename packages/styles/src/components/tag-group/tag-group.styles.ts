import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tagGroupVariants = tv({
  slots: {
    base: "tag-group",
    list: "tag-group__list",
  },
});

export type TagGroupVariants = VariantProps<typeof tagGroupVariants>;
