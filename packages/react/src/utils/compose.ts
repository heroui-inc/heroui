"use client";

import {composeRenderProps} from "react-aria-components";
import {twMerge} from "tailwind-merge";

function composeTwRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind?: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tailwind, className));
}

const focusRingClasses =
  "focus-visible:ring-focus focus-visible:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const disabledClasses =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]";

const ariaDisabledClasses =
  "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-[var(--disabled-opacity)]";

export {composeTwRenderProps, focusRingClasses, disabledClasses, ariaDisabledClasses};
