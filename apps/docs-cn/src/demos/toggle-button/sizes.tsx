import {Heart} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <ToggleButton size="sm">
          <Heart />
          Small
        </ToggleButton>
        <ToggleButton size="md">
          <Heart />
          Medium
        </ToggleButton>
        <ToggleButton size="lg">
          <Heart />
          Large
        </ToggleButton>
      </div>
      <div className="flex items-center gap-3">
        <ToggleButton isIconOnly aria-label="Like" size="sm">
          <Heart />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Like" size="md">
          <Heart />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Like" size="lg">
          <Heart />
        </ToggleButton>
      </div>
    </div>
  );
}
