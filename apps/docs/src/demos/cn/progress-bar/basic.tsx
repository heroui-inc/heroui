import type {ProgressBarProps} from "@heroui/react";

import {Label, ProgressBar} from "@heroui/react";

export function Basic(props: ProgressBarProps) {
  return (
    <ProgressBar {...props} aria-label="加载中" className="w-64">
      <Label>加载中</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
