import {Separator} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="max-w-xs space-y-4">
      <p className="text-sm font-medium text-foreground">Account settings</p>
      <Separator className="bg-separator-secondary" />
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>Profile</span>
        <Separator className="h-4 bg-separator" orientation="vertical" />
        <span>Billing</span>
        <Separator className="h-4 bg-separator" orientation="vertical" />
        <span>Security</span>
      </div>
    </div>
  );
}
