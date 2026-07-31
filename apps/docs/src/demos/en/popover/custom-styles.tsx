import {Button, Popover} from "@heroui/react";

export function CustomStyles() {
  return (
    <Popover>
      <Button variant="secondary">Details</Button>
      <Popover.Content className="max-w-56 overflow-hidden rounded-xl border border-border/80 bg-surface/90 p-0 shadow-xl ring-1 ring-black/5 backdrop-blur-xl dark:border-border/90 dark:bg-surface/85 dark:ring-white/10">
        <Popover.Dialog className="relative p-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-linear-to-b from-neutral-500/6 to-transparent dark:from-neutral-400/8"
          />
          <Popover.Heading className="relative font-medium text-neutral-800 dark:text-neutral-100">
            Keyboard shortcuts
          </Popover.Heading>
          <dl className="relative mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Save</dt>
              <dd className="font-mono text-neutral-700 dark:text-neutral-300">⌘ S</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Search</dt>
              <dd className="font-mono text-neutral-700 dark:text-neutral-300">⌘ K</dd>
            </div>
          </dl>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
