export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

import {cnMerge} from "tailwind-variants";

import {twMergeConfig} from "./tw-merge-config";

/**
 * We need to extend the tailwind merge to include HeroUI's custom classes.
 *
 * So we can use classes like `text-small` or `text-default-500` and override them.
 */

export function cn(...inputs: ClassValue[]) {
  return cnMerge(...inputs)({twMergeConfig});
}
