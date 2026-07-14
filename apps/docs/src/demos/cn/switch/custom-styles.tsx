"use client";

import {Description, Label, Switch} from "@heroui/react";

export function CustomStyles() {
  return (
    <Switch id="autosave">
      <Switch.Content>
        <Switch.Control className="[--switch-control-bg-checked-hover:var(--success)] [--switch-control-bg-checked:var(--success)]">
          <Switch.Thumb />
        </Switch.Control>
        <div className="flex flex-col gap-0.5">
          <Label htmlFor="autosave">自动保存草稿</Label>
          <Description>输入时会自动保存更改。</Description>
        </div>
      </Switch.Content>
    </Switch>
  );
}
