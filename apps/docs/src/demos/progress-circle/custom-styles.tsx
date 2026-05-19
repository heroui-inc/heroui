import {ProgressCircle} from "@heroui/react";

export function CustomStyles() {
  return (
    <ProgressCircle
      aria-label="Sync progress"
      className="size-14 text-neutral-700 dark:text-neutral-300"
      value={68}
    >
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle className="stroke-neutral-200 dark:stroke-neutral-800" />
        <ProgressCircle.FillCircle
          className="stroke-neutral-700 dark:stroke-neutral-300"
          strokeLinecap="round"
        />
      </ProgressCircle.Track>
    </ProgressCircle>
  );
}
