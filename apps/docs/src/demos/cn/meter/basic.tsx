import type {MeterProps} from "@heroui/react";

import {Label, Meter} from "@heroui/react";

export function Basic(props: MeterProps) {
  return (
    <Meter {...props} aria-label="存储空间" className="w-64">
      <Label>存储空间</Label>
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}
