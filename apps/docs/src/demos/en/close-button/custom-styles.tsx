import {CloseButton} from "@heroui/react";

export function CustomStyles() {
  return (
    <CloseButton className="size-9 rounded-full border border-neutral-300/70 bg-linear-to-b from-white to-neutral-50 text-neutral-600 shadow-sm ring-1 ring-black/5 transition-[transform,box-shadow] hover:bg-neutral-50 hover:shadow-md active:scale-95 dark:border-neutral-600/70 dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-300 dark:ring-white/10 dark:hover:bg-neutral-800" />
  );
}
