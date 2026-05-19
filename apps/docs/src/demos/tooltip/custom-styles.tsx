import {Button, Tooltip} from "@heroui/react";

export function CustomStyles() {
  return (
    <Tooltip delay={0}>
      <Button variant="secondary">Hover me</Button>
      <Tooltip.Content className="rounded-full border-0 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-50 shadow-lg dark:bg-neutral-100 dark:text-neutral-900">
        <p>⌘ K to search</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
