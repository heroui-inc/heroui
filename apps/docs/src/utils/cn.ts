import type {ClassValue} from "clsx";

import clsx from "clsx";
import {twMerge} from "tailwind-variants";

/**
 * We need to extend the tailwind merge to include HeroUI's custom classes.
 *
 * So we can use classes like `text-small` or `text-default-500` and override them.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
