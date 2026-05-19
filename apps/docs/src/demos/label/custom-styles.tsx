import {Input, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        className="text-sm font-medium tracking-tight text-neutral-800 dark:text-neutral-100"
        htmlFor="name"
      >
        Name
      </Label>
      <Input
        className="w-64 rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-visible:ring-2 focus-visible:ring-neutral-400/25 dark:ring-white/10 dark:focus-visible:ring-neutral-500/30"
        id="name"
        placeholder="Enter your name"
        type="text"
      />
    </div>
  );
}
