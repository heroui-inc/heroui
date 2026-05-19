import {Input, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium tracking-tight text-foreground" htmlFor="name">
        Name
      </Label>
      <Input
        className="w-64 rounded-xl border border-border bg-surface text-foreground shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-visible:ring-2 focus-visible:ring-foreground/15 dark:ring-white/10"
        id="name"
        placeholder="Enter your name"
        type="text"
      />
    </div>
  );
}
