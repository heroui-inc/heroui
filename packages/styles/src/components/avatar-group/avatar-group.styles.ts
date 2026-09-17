import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const avatarGroupVariants = tv({
  defaultVariants: {
    isGrid: false,
    overlap: "clip",
  },
  slots: {
    base: "avatar-group",
    count: "avatar-group__count",
  },
  variants: {
    isGrid: {
      false: {},
      true: {
        base: "avatar-group--grid",
      },
    },
    overlap: {
      clip: {
        base: "avatar-group--clip",
      },
      ring: {
        base: "avatar-group--ring",
      },
    },
  },
});

export type AvatarGroupVariants = VariantProps<typeof avatarGroupVariants>;
