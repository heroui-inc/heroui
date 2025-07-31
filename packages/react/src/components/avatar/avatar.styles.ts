import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const avatarVariants = tv({
  defaultVariants: {
    color: "default",
    size: "md",
  },
  slots: {
    base: "avatar",
    fallback: "avatar__fallback",
    image: "avatar__image",
  },
  variants: {
    color: {
      accent: {
        fallback: "avatar__fallback--accent",
      },
      danger: {
        fallback: "avatar__fallback--danger",
      },
      default: {
        fallback: "avatar__fallback--default",
      },
      success: {
        fallback: "avatar__fallback--success",
      },
      warning: {
        fallback: "avatar__fallback--warning",
      },
    },
    size: {
      lg: {
        base: "avatar--lg",
      },
      md: {
        base: "avatar--md",
      },
      sm: {
        base: "avatar--sm",
      },
    },
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
