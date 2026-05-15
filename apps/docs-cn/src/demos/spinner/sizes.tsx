import {Spinner} from "@heroui/react";

const SIZE_LABELS = {
  lg: "大",
  md: "中",
  sm: "小",
  xl: "特大",
} as const;

const sizes = ["sm", "md", "lg", "xl"] as const;

export function SpinnerSizes() {
  return (
    <div className="flex items-center gap-8">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-xs text-muted">{SIZE_LABELS[size]}</span>
        </div>
      ))}
    </div>
  );
}
