import {Meter} from "@heroui/react";

export function WithoutLabel() {
  return (
    <Meter aria-label="存储空间用量" className="w-64" value={45}>
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}
