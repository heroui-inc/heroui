import {ProgressBar} from "@heroui/react";

export function WithoutLabel() {
  return (
    <ProgressBar aria-label="Loading progress" className="w-64" value={45}>
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
