import {Separator} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="max-w-xs space-y-4">
      <p className="text-sm font-medium text-foreground">账户设置</p>
      <Separator className="bg-separator-secondary" />
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>个人资料</span>
        <Separator className="h-4 bg-separator" orientation="vertical" />
        <span>账单</span>
        <Separator className="h-4 bg-separator" orientation="vertical" />
        <span>安全</span>
      </div>
    </div>
  );
}
