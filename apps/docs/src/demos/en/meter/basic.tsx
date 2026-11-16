import type {MeterProps} from "@heroui/react";

import {Label, Meter} from "@heroui/react";

export function Basic(props: MeterProps) {
  return (
    <Meter {...props} aria-label="Storage" className="w-64">
      <Label>Storage</Label>
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}
