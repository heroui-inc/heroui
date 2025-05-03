"use client";

import {composeRenderProps} from "react-aria-components";
import {twMerge} from "tailwind-merge";

function composeTwRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind?: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tailwind, className));
}

const focusRing =
  "focus-visible:ring-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export {composeTwRenderProps, focusRing};
