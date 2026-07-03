import {ProgressCircle} from "@heroui/react";

export function CustomStyles() {
  return (
    <ProgressCircle aria-label="Sync progress" className="size-14" value={68}>
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle className="stroke-muted/40" />
        <ProgressCircle.FillCircle className="stroke-fuchsia-500!" strokeLinecap="round" />
      </ProgressCircle.Track>
    </ProgressCircle>
  );
}
