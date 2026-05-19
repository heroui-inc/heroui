import {Label, ProgressBar} from "@heroui/react";

export function CustomStyles() {
  return (
    <ProgressBar aria-label="Upload progress" className="w-64 gap-2" value={72}>
      <div className="flex w-full items-center justify-between gap-2">
        <Label className="font-medium text-foreground">Uploading</Label>
        <ProgressBar.Output className="text-xs font-medium text-muted tabular-nums" />
      </div>
      <ProgressBar.Track className="relative h-2 overflow-hidden rounded-full bg-muted/35">
        <ProgressBar.Fill className="relative h-full rounded-full bg-transparent! bg-linear-to-r from-orange-400 to-fuchsia-500 dark:from-orange-300 dark:to-fuchsia-400" />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
