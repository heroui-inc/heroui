import {Label, ProgressBar} from "@heroui/react";

export function Indeterminate() {
  return (
    <ProgressBar isIndeterminate aria-label="加载中" className="w-64">
      <Label>加载中…</Label>
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
