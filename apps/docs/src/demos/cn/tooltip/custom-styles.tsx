import {Button, Tooltip} from "@heroui/react";

export function CustomStyles() {
  return (
    <Tooltip delay={0}>
      <Button variant="secondary">分享链接</Button>
      <Tooltip.Content className="rounded-lg border border-border/80 bg-surface px-2.5 py-1 text-xs text-foreground shadow-sm">
        <p>已复制到剪贴板</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
