import {Label, ProgressCircle} from "@heroui/react";

export function WithLabel() {
  return (
    <div className="flex items-center gap-3">
      <ProgressCircle aria-label="Loading" value={75}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <Label>75% Complete</Label>
    </div>
  );
}
