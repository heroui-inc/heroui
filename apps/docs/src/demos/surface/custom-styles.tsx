import {Surface} from "@heroui/react";

export function CustomStyles() {
  return (
    <Surface
      className="flex min-w-[280px] flex-col gap-2 rounded-xl border border-border/80 bg-linear-to-b from-neutral-50/90 to-white p-5 shadow-sm ring-1 ring-black/5 dark:from-neutral-900/80 dark:to-neutral-900 dark:ring-white/10"
      variant="default"
    >
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Workspace</h3>
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Shared files and settings for your team.
      </p>
    </Surface>
  );
}
