import {Label, Meter} from "@heroui/react";

const SIZE_LABELS = {
  lg: "大",
  md: "中",
  sm: "小",
} as const;

export function Sizes() {
  return (
    <div className="flex w-64 flex-col gap-6">
      <Meter color="success" size="sm" value={40}>
        <Label>{SIZE_LABELS.sm}</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Meter color="accent" size="md" value={60}>
        <Label>{SIZE_LABELS.md}</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Meter color="warning" size="lg" value={80}>
        <Label>{SIZE_LABELS.lg}</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
    </div>
  );
}
