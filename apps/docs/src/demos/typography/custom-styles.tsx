import {Typography} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex max-w-md flex-col gap-2">
      <Typography
        className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        type="h3"
      >
        Build better interfaces
      </Typography>
      <Typography
        className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
        type="body-sm"
      >
        Semantic type scales with neutral contrast in light and dark themes.
      </Typography>
    </div>
  );
}
