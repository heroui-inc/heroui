import {Label, Meter} from "@heroui/react";

export function CustomStyles() {
  return (
    <Meter aria-label="Storage" className="w-64" value={60}>
      <Label className="font-medium text-foreground">Storage</Label>
      <Meter.Output className="text-muted tabular-nums" />
      <Meter.Track className="overflow-hidden rounded-full bg-neutral-200/70 dark:bg-neutral-800/70">
        <Meter.Fill className="rounded-full bg-transparent! bg-linear-to-r from-neutral-400 via-neutral-500 to-neutral-700 dark:from-neutral-600 dark:via-neutral-400 dark:to-neutral-200" />
      </Meter.Track>
    </Meter>
  );
}
