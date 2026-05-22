import {ProgressCircle} from "@heroui/react";

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
    <div className="flex items-center gap-6">
      {colors.map((color) => (
        <ProgressCircle key={color} aria-label={COLOR_LABELS[color]} color={color} value={60}>
          <ProgressCircle.Track>
            <ProgressCircle.TrackCircle />
            <ProgressCircle.FillCircle />
          </ProgressCircle.Track>
        </ProgressCircle>
      ))}
    </div>
  );
}
