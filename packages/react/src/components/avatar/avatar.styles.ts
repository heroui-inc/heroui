import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const avatarVariants = tv({
  slots: {
    base: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    image: "aspect-square h-full w-full",
    fallback: "bg-base flex h-full w-full items-center justify-center rounded-full border",
  },
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
    color: {
      accent: {
        fallback: "text-accent",
      },
      base: {
        fallback: "text-base-foreground",
      },
      success: {
        fallback: "text-success",
      },
      warning: {
        fallback: "text-warning",
      },
      danger: {
        fallback: "text-danger",
      },
    },
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
