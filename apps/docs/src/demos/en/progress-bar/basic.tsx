import type {ProgressBarProps} from "@heroui/react";

import {Label, ProgressBar} from "@heroui/react";

export function Basic(props: ProgressBarProps) {
  return (
    <ProgressBar {...props} aria-label="Loading" className="w-64">
      <Label>Loading</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
