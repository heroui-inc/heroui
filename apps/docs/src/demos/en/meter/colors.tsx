import {Label, Meter} from "@heroui/react";

export function Colors() {
  return (
    <div className="flex w-64 flex-col gap-6">
      <Meter color="default" value={50}>
        <Label>Default</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Meter color="accent" value={50}>
        <Label>Accent</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Meter color="success" value={50}>
        <Label>Success</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Meter color="warning" value={50}>
        <Label>Warning</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Meter color="danger" value={50}>
        <Label>Danger</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
    </div>
  );
}
