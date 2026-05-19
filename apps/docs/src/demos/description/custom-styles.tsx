import {Description, Input, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex w-64 flex-col gap-1.5">
      <Label className="text-sm font-medium text-foreground" htmlFor="workspace-slug">
        Workspace URL
      </Label>
      <Input
        aria-describedby="workspace-slug-hint"
        className="rounded-lg border border-border bg-surface font-mono text-sm text-foreground shadow-sm ring-1 ring-black/5 placeholder:text-muted dark:ring-white/10"
        id="workspace-slug"
        placeholder="acme"
        type="text"
      />
      <Description
        className="text-xs leading-relaxed tracking-wide text-muted"
        id="workspace-slug-hint"
      >
        Lowercase letters and hyphens only. Used in app.heroui.com/acme
      </Description>
    </div>
  );
}
