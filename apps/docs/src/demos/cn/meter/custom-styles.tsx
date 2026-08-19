import {Label, Meter} from "@heroui/react";

export function CustomStyles() {
  return (
    <Meter aria-label="已用存储空间" className="w-64" value={68}>
      <Label className="font-medium text-foreground">已用存储空间</Label>
      <Meter.Output className="text-muted tabular-nums" />
      <Meter.Track className="rounded-full bg-default">
        <Meter.Fill className="rounded-full bg-warning" />
      </Meter.Track>
    </Meter>
  );
}
