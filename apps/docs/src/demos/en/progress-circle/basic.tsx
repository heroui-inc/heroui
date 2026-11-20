import type {ProgressCircleProps} from "@heroui/react";

import {ProgressCircle} from "@heroui/react";

export function Basic(props: ProgressCircleProps) {
  return (
    <ProgressCircle {...props} aria-label="Loading">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
  );
}
