import {buttonVariants} from "@heroui/react";
import {tv} from "tailwind-variants";

export const docsButtonVariants = tv({
  defaultVariants: {
    size: "sm",
    variant: "tertiary",
  },
  extend: buttonVariants,
  variants: {
    variant: {
      tertiary: "dark:bg-default/70 relative gap-2",
    },
  },
});
