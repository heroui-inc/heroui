import {Spinner} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-6 rounded-xl border border-border/80 bg-surface px-6 py-5 ring-1 ring-black/5 dark:ring-white/10">
      <Spinner className="text-neutral-600 dark:text-neutral-400" size="sm" />
      <Spinner className="animate-shine text-neutral-600 dark:text-neutral-400" size="md" />
      <Spinner className="text-neutral-600 dark:text-neutral-400" size="lg" />
    </div>
  );
}
