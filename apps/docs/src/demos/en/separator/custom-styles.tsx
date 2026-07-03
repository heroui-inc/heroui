import {Separator} from "@heroui/react";

const fadeRule =
  "bg-linear-to-r from-transparent via-neutral-300/60 to-transparent dark:via-neutral-600/50";

const solidRule = "bg-neutral-300/70 dark:bg-neutral-600/60";

export function CustomStyles() {
  return (
    <div className="max-w-md">
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">HeroUI v3</h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Modern React UI for Tailwind CSS v4.
        </p>
      </div>
      <Separator className={`my-4 ${fadeRule}`} />
      <div className="flex h-5 items-center gap-4 text-sm text-neutral-700 dark:text-neutral-300">
        <span>Blog</span>
        <Separator className={solidRule} orientation="vertical" />
        <span>Docs</span>
        <Separator className={solidRule} orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  );
}
