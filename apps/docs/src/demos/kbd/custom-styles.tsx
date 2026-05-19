import {Kbd} from "@heroui/react";

const keyCap =
  "rounded-md border border-neutral-300/70 bg-linear-to-b from-white to-neutral-50 px-2.5 font-medium text-neutral-700 shadow-[0_1px_0_0_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.8)] ring-1 ring-black/5 dark:border-neutral-600/70 dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-200 dark:shadow-[0_1px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.06)] dark:ring-white/10";

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
