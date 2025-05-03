"use client";

import {composeRenderProps} from "react-aria-components";
import {twMerge} from "tailwind-merge";
import {tv} from "tailwind-variants";

function composeTwRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tailwind, className));
}

const focusRing = tv({
  variants: {
    isFocusVisible: {true: "outline-hidden ring-focus/20 ring-4"},
    isFocused: {true: "outline-hidden ring-focus/20 data-invalid:ring-danger/20 ring-4"},
    isInvalid: {true: "ring-danger/20 ring-4"},
  },
});

const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: {true: "border-ring/70 forced-colors:border-[Highlight]"},
    isInvalid: {true: "border-danger/70 forced-colors:border-[Mark]"},
  },
});

export {composeTwRenderProps, focusRing, focusStyles};
