import {Spinner} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-6 rounded-xl border border-border bg-surface px-6 py-5 ring-1 ring-black/5 dark:ring-white/10">
      <Spinner className="text-muted" size="sm" />
      <Spinner className="text-foreground" size="md" />
      <Spinner className="text-muted" size="lg" />
    </div>
  );
}
