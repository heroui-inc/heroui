import {Surface} from "@heroui/react";

export function CustomStyles() {
  return (
    <Surface
      className="flex min-w-[280px] flex-col gap-2 rounded-xl border border-border bg-surface p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      variant="default"
    >
      <h3 className="text-sm font-semibold text-foreground">Workspace</h3>
      <p className="text-sm leading-relaxed text-muted">Shared files and settings for your team.</p>
    </Surface>
  );
}
