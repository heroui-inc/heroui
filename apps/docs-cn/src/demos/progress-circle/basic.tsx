import {ProgressCircle} from "@heroui/react";

export function Basic() {
  return (
    <ProgressCircle aria-label="加载中" value={60}>
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
  );
}
