import {Button, Popover} from "@heroui/react";

export function CustomStyles() {
  return (
    <Popover>
      <Button variant="secondary">Details</Button>
      <Popover.Content className="max-w-56 overflow-hidden rounded-xl border border-border bg-surface p-0 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        <Popover.Dialog className="p-4">
          <Popover.Heading className="font-medium text-foreground">
            Keyboard shortcuts
          </Popover.Heading>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Save</dt>
              <dd className="font-mono text-foreground">Cmd S</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Search</dt>
              <dd className="font-mono text-foreground">Cmd K</dd>
            </div>
          </dl>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
