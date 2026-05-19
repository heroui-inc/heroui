import {Heart} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function CustomStyles() {
  return (
    <ToggleButton className="group gap-2 rounded-lg border border-neutral-300/70 bg-linear-to-b from-white to-neutral-50 px-4 font-medium text-neutral-700 shadow-sm ring-1 ring-black/5 transition-[transform,box-shadow] active:scale-[0.98] data-[selected=true]:border-neutral-900 data-[selected=true]:bg-neutral-900 data-[selected=true]:text-neutral-50 dark:border-neutral-600/70 dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-200 dark:data-[selected=true]:border-neutral-100 dark:data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:text-neutral-900 [&_svg]:text-neutral-400 [&_svg]:transition-colors data-[selected=true]:[&_svg]:text-neutral-50 dark:data-[selected=true]:[&_svg]:text-neutral-900">
      <Heart />
      Like
    </ToggleButton>
  );
}
