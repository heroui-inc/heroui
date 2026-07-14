import {Button, Tooltip} from "@heroui/react";

export function CustomStyles() {
  return (
    <Tooltip delay={0}>
      <Button variant="secondary">Share link</Button>
      <Tooltip.Content className="rounded-lg border border-border/80 bg-surface px-2.5 py-1 text-xs text-foreground shadow-sm">
        <p>Copied to clipboard</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
