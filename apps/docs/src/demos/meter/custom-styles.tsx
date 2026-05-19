import {Label, Meter} from "@heroui/react";

export function CustomStyles() {
  return (
    <Meter
      aria-label="Storage"
      className="w-64 [--meter-fill:#525252] dark:[--meter-fill:#d4d4d4]"
      value={60}
    >
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Storage</Label>
      <Meter.Output className="text-neutral-600 tabular-nums dark:text-neutral-400" />
      <Meter.Track className="bg-neutral-200/80 dark:bg-neutral-800">
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}
