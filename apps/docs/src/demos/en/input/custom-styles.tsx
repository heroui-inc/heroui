import {Input} from "@heroui/react";

export function CustomStyles() {
  return (
    <Input
      aria-label="Search projects"
      className="w-64 rounded-xl border border-border/80 bg-default text-foreground placeholder:text-muted"
      placeholder="Search projects..."
    />
  );
}
