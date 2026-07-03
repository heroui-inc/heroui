import {Kbd} from "@heroui/react";

const keyCap =
  "rounded-md border border-border bg-surface px-2.5 font-medium text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-4">
      <Kbd className={keyCap}>
        <Kbd.Abbr keyValue="command" />
        <Kbd.Content>K</Kbd.Content>
      </Kbd>
      <Kbd className={keyCap}>
        <Kbd.Abbr keyValue="shift" />
        <Kbd.Content>P</Kbd.Content>
      </Kbd>
    </div>
  );
}
