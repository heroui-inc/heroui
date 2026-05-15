import {Spinner} from "@heroui/react";

const COLOR_LABELS = {
  accent: "强调",
  current: "当前",
  danger: "危险",
  success: "成功",
  warning: "警告",
} as const;

const colors = ["current", "accent", "success", "warning", "danger"] as const;

export function SpinnerColors() {
  return (
    <div className="flex items-center gap-8">
      {colors.map((color) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <Spinner color={color} />
          <span className="text-xs text-muted">{COLOR_LABELS[color]}</span>
        </div>
      ))}
    </div>
  );
}
