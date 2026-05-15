import {Label, ProgressCircle} from "@heroui/react";

export function WithLabel() {
  return (
    <div className="flex items-center gap-3">
      <ProgressCircle aria-label="加载中" value={75}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <Label>已完成 75%</Label>
    </div>
  );
}
