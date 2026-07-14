import {Description, Input, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex w-64 flex-col gap-1">
      <Label htmlFor="workspace-slug">工作区 URL</Label>
      <Input id="workspace-slug" placeholder="acme" type="text" />
      <Description className="leading-relaxed tracking-wide" id="workspace-slug-hint">
        仅支持小写字母和连字符。将用于 app.heroui.com/acme
      </Description>
    </div>
  );
}
