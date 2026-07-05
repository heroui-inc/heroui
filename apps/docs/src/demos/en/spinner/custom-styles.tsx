import {Spinner} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4">
      <Spinner className="text-accent" size="sm" />
      <Spinner className="text-muted" size="md" />
      <Spinner className="text-success" size="lg" />
    </div>
  );
}
