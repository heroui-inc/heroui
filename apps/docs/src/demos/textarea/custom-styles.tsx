import {TextArea} from "@heroui/react";

const fieldClass =
  "rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-visible:ring-2 focus-visible:ring-foreground/15 dark:ring-white/10";

export function CustomStyles() {
  return (
    <TextArea
      aria-label="Notes"
      className={`h-28 w-full max-w-xs text-sm text-foreground placeholder:text-muted ${fieldClass}`}
      placeholder="Add a note..."
    />
  );
}
