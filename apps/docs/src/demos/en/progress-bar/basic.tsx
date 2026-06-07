import {Label, ProgressBar} from "@heroui/react";

export function Basic() {
  return (
    <ProgressBar aria-label="Loading" className="w-64" value={60}>
      <Label>Loading</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
