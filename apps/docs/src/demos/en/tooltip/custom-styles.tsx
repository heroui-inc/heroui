import {Button, Tooltip} from "@heroui/react";

export function CustomStyles() {
  return (
    <Tooltip delay={0}>
      <Button variant="secondary">Hover me</Button>
      <Tooltip.Content className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        <p>Cmd K to search</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
