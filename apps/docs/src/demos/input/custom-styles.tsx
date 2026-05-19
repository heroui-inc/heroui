import {Input} from "@heroui/react";

export function CustomStyles() {
  return (
    <Input
      aria-label="Name"
      className="w-64 rounded-xl border border-border bg-surface text-foreground shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-visible:ring-2 focus-visible:ring-foreground/15 dark:ring-white/10"
      placeholder="Enter your name"
    />
  );
}
