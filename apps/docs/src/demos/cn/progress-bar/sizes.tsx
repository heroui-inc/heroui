import {Label, ProgressBar} from "@heroui/react";

const SIZE_LABELS = {
  lg: "大",
  md: "中",
  sm: "小",
} as const;

export function Sizes() {
  return (
    <div className="flex w-64 flex-col gap-6">
      <ProgressBar aria-label={SIZE_LABELS.sm} size="sm" value={40}>
        <Label>{SIZE_LABELS.sm}</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <ProgressBar aria-label={SIZE_LABELS.md} size="md" value={60}>
        <Label>{SIZE_LABELS.md}</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <ProgressBar aria-label={SIZE_LABELS.lg} size="lg" value={80}>
        <Label>{SIZE_LABELS.lg}</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    </div>
  );
}
