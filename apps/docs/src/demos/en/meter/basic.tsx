import {Label, Meter} from "@heroui/react";

export function Basic() {
  return (
    <Meter aria-label="Storage" className="w-64" value={60}>
      <Label>Storage</Label>
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}
