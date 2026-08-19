import {Label, ProgressBar} from "@heroui/react";

export function CustomStyles() {
  return (
    <ProgressBar aria-label="上传进度" className="w-64" value={45}>
      <Label className="font-medium text-foreground">正在上传 resume.pdf</Label>
      <ProgressBar.Output className="text-xs text-muted tabular-nums" />
      <ProgressBar.Track className="rounded-full bg-default">
        <ProgressBar.Fill className="rounded-full bg-accent" />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
