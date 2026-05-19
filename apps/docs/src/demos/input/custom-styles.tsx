import {Input} from "@heroui/react";

export function CustomStyles() {
  return (
    <Input
      aria-label="Name"
      className="w-64 rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-visible:ring-2 focus-visible:ring-neutral-400/25 dark:ring-white/10 dark:focus-visible:ring-neutral-500/30"
      placeholder="Enter your name"
    />
  );
}
