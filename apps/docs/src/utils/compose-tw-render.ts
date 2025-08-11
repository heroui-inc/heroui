import {composeRenderProps} from "react-aria-components";
import {twMerge} from "tailwind-merge";
import {tv} from "tailwind-variants";

export const focusRing = tv({
  base: "outline-focus dark:outline-focus outline-offset-2 forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}
