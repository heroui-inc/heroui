import type {ClassValue} from "clsx";

import clsx from "clsx";
import {twMerge as baseTwMerge} from "tailwind-merge";

const PREFIX = 'vg-';

/**
 * Custom cn function that handles vg- prefixed classes.
 *
 * Process:
 * 1. Combine all inputs with clsx
 * 2. Strip vg- prefix from all classes
 * 3. Use tailwind-merge to merge conflicts
 * 4. Add vg- prefix back to all classes
 */
export function cn(...inputs: ClassValue[]) {
  // Combine all class values
  const combined = clsx(inputs);

  if (!combined) return '';

  // Split into individual classes
  const classes = combined.split(' ').filter(Boolean);

  // Strip vg- prefix from all classes
  const unprefixed = classes.map(cls => {
    // Handle !important with prefix: !vg-outline-none -> !outline-none
    if (cls.startsWith('!')) {
      const rest = cls.substring(1);
      if (rest.startsWith(PREFIX)) {
        return '!' + rest.substring(PREFIX.length);
      }
      return cls;
    }

    // Regular prefixed class: vg-text-red-500 -> text-red-500
    if (cls.startsWith(PREFIX)) {
      return cls.substring(PREFIX.length);
    }

    // Keep custom classes as-is
    return cls;
  }).join(' ');

  // Merge using tailwind-merge (handles conflicts like text-red-500 + text-blue-500)
  const merged = baseTwMerge(unprefixed);

  // Split merged result and add prefix back
  return merged.split(' ')
    .filter(Boolean)
    .map(cls => {
      // Handle !important: !outline-none -> !vg-outline-none
      if (cls.startsWith('!')) {
        return '!' + PREFIX + cls.substring(1);
      }

      // Add prefix to all classes: text-red-500 -> vg-text-red-500
      return PREFIX + cls;
    })
    .join(' ');
}
