import {Description, Input, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex w-64 flex-col gap-1">
      <Label htmlFor="workspace-slug">Workspace URL</Label>
      <Input id="workspace-slug" placeholder="acme" type="text" />
      <Description className="leading-relaxed tracking-wide" id="workspace-slug-hint">
        Lowercase letters and hyphens only. Used in app.heroui.com/acme
      </Description>
    </div>
  );
}
