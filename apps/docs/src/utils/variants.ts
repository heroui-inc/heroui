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
      tertiary: "bg-default/50 dark:bg-default/30 relative gap-2",
    },
  },
});
