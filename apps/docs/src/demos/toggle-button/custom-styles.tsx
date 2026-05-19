import {Heart} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function CustomStyles() {
  return (
    <ToggleButton className="group gap-2 rounded-lg border border-border bg-surface px-4 font-medium text-foreground shadow-sm ring-1 ring-black/5 transition-[transform,box-shadow] active:scale-[0.98] data-[selected=true]:border-foreground data-[selected=true]:bg-foreground data-[selected=true]:text-background dark:ring-white/10 [&_svg]:text-muted [&_svg]:transition-colors data-[selected=true]:[&_svg]:text-background">
      <Heart />
      Like
    </ToggleButton>
  );
}
