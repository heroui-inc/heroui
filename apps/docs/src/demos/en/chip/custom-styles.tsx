import {Chip} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip
        className="rounded-full border border-neutral-300/80 bg-white/80 px-3 font-medium text-neutral-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm dark:border-neutral-600/80 dark:bg-neutral-900/60 dark:text-neutral-200 dark:ring-white/10"
        variant="secondary"
      >
        Draft
      </Chip>
      <Chip
        className="rounded-full bg-neutral-900 px-3 font-medium text-neutral-50 shadow-md dark:bg-neutral-100 dark:text-neutral-900"
        variant="secondary"
      >
        Published
      </Chip>
    </div>
  );
}
