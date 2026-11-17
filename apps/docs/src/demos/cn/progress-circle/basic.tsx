import type {ProgressCircleProps} from "@heroui/react";

import {ProgressCircle} from "@heroui/react";

export function Basic(props: ProgressCircleProps) {
  return (
    <ProgressCircle {...props} aria-label="加载中">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
  );
}
