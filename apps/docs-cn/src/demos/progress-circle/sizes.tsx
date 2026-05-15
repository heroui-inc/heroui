import {ProgressCircle} from "@heroui/react";

const SIZE_LABELS = {
  lg: "大",
  md: "中",
  sm: "小",
} as const;

export function Sizes() {
  return (
    <div className="flex items-center gap-6">
      <ProgressCircle aria-label={SIZE_LABELS.sm} size="sm" value={40}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <ProgressCircle aria-label={SIZE_LABELS.md} size="md" value={60}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <ProgressCircle aria-label={SIZE_LABELS.lg} size="lg" value={80}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
    </div>
  );
}
