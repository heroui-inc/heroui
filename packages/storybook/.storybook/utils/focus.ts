import {tv} from "tailwind-variants";

export const focusRing = tv({
  base: "outline outline-offset-2 outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});
