import {Label, ProgressBar} from "@heroui/react";

export function CustomStyles() {
  return (
    <ProgressBar aria-label="Upload progress" className="w-64 gap-2" value={72}>
      <div className="flex w-full items-center justify-between gap-2">
        <Label className="font-medium text-neutral-800 dark:text-neutral-100">Uploading</Label>
        <ProgressBar.Output className="text-xs font-medium text-neutral-600 tabular-nums dark:text-neutral-400" />
      </div>
      <ProgressBar.Track className="relative h-2 overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800">
        <ProgressBar.Fill className="animate-shine relative h-full rounded-full bg-linear-to-r from-neutral-500 via-neutral-700 to-neutral-600 dark:from-neutral-400 dark:via-neutral-200 dark:to-neutral-300" />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
