import {ColorArea} from "@heroui/react";

export function CustomStyles() {
  return (
    <ColorArea
      className="size-48 rounded-2xl border border-border/80 shadow-md ring-1 ring-neutral-300/50 dark:ring-neutral-600/50"
      defaultValue="rgb(82, 82, 91)"
    >
      <ColorArea.Thumb className="size-4 border-2 border-white shadow-lg ring-1 ring-neutral-400/40 dark:border-neutral-900 dark:ring-neutral-500/50" />
    </ColorArea>
  );
}
