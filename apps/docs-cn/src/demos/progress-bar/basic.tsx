import {Label, ProgressBar} from "@heroui/react";

export function Basic() {
  return (
    <ProgressBar aria-label="加载中" className="w-64" value={60}>
      <Label>加载中</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
