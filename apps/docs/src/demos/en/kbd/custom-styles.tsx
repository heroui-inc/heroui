import {Kbd} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-3">
      <Kbd className="rounded-lg bg-accent-soft px-2.5 text-accent-soft-foreground">
        <Kbd.Abbr keyValue="command" />
        <Kbd.Content>K</Kbd.Content>
      </Kbd>
      <Kbd className="rounded-lg bg-default px-2.5 text-muted">
        <Kbd.Abbr keyValue="shift" />
        <Kbd.Content>P</Kbd.Content>
      </Kbd>
    </div>
  );
}
