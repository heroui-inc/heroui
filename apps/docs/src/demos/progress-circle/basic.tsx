import {ProgressCircle} from "@heroui/react";

export function Basic() {
  return (
    <ProgressCircle aria-label="Loading" value={60}>
      <ProgressCircle.Track />
      <ProgressCircle.Output />
    </ProgressCircle>
  );
}
