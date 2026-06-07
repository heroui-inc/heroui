import {Label, Meter} from "@heroui/react";

export function CustomValue() {
  return (
    <Meter
      className="w-64"
      formatOptions={{currency: "USD", style: "currency"}}
      maxValue={1000}
      minValue={0}
      value={750}
    >
      <Label>收入</Label>
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}
