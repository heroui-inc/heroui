import {TextArea} from "@heroui/react";

const fieldClass =
  "rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-visible:ring-2 focus-visible:ring-neutral-400/25 dark:ring-white/10 dark:focus-visible:ring-neutral-500/30";

export function CustomStyles() {
  return (
    <TextArea
      aria-label="Notes"
      className={`h-28 w-full max-w-xs text-sm text-neutral-800 placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500 ${fieldClass}`}
      placeholder="Add a note..."
    />
  );
}
