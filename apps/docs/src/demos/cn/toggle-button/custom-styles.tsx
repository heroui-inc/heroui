import {Heart} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function CustomStyles() {
  return (
    <ToggleButton className="gap-2 rounded-full border border-border/80 bg-surface px-4 text-foreground shadow-sm data-[selected=true]:border-accent/30 data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent-soft-foreground [&_svg]:text-muted data-[selected=true]:[&_svg]:text-accent">
      <Heart />
      收藏文章
    </ToggleButton>
  );
}
