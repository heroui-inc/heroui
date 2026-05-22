import {Bookmark, Heart} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function IconOnly() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isIconOnly aria-label="点赞">
        <Heart />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="收藏" variant="ghost">
        <Bookmark />
      </ToggleButton>
    </div>
  );
}
