/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const avatarVariants = tv({
  slots: {
    base: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    image: "aspect-square h-full w-full",
    fallback: "bg-base flex h-full w-full items-center justify-center rounded-full border",
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
