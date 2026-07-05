import {Label, ProgressBar} from "@heroui/react";

export function CustomStyles() {
  return (
    <ProgressBar aria-label="Upload progress" className="w-64" value={45}>
      <Label className="font-medium text-foreground">Uploading resume.pdf</Label>
      <ProgressBar.Output className="text-xs text-muted tabular-nums" />
      <ProgressBar.Track className="rounded-full bg-default">
        <ProgressBar.Fill className="rounded-full bg-accent" />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
