import {ColorArea} from "@heroui/react";

export function CustomStyles() {
  return (
    <ColorArea
      className="size-44 rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      defaultValue="rgb(82, 82, 91)"
    >
      <ColorArea.Thumb className="size-4 border-2 border-background shadow-md ring-1 ring-black/10 dark:ring-white/20" />
    </ColorArea>
  );
}
