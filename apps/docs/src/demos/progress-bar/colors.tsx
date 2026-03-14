import {Label, ProgressBar} from "@heroui/react";

export function Colors() {
  return (
    <div className="flex w-64 flex-col gap-6">
      <ProgressBar aria-label="Default" color="default" value={50}>
        <Label>Default</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <ProgressBar aria-label="Accent" color="accent" value={50}>
        <Label>Accent</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <ProgressBar aria-label="Success" color="success" value={50}>
        <Label>Success</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <ProgressBar aria-label="Warning" color="warning" value={50}>
        <Label>Warning</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <ProgressBar aria-label="Danger" color="danger" value={50}>
        <Label>Danger</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    </div>
  );
}
