import {Label, Meter} from "@heroui/react";

const colors = ["default", "accent", "success", "warning", "danger"] as const;

const COLOR_LABELS: Record<(typeof colors)[number], string> = {
  accent: "强调",
  danger: "危险",
  default: "默认",
  success: "成功",
  warning: "警告",
};

export function Colors() {
  return (
    <div className="flex w-64 flex-col gap-6">
      {colors.map((color) => (
        <Meter key={color} color={color} value={50}>
          <Label>{COLOR_LABELS[color]}</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
      ))}
    </div>
  );
}
