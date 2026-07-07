import {Input} from "@heroui/react";

export function CustomStyles() {
  return (
    <Input
      aria-label="搜索项目"
      className="w-64 rounded-xl border border-border/80 bg-default text-foreground placeholder:text-muted"
      placeholder="搜索项目…"
    />
  );
}
