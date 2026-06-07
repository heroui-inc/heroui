import {Heart} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <ToggleButton size="sm">
          <Heart />小
        </ToggleButton>
        <ToggleButton size="md">
          <Heart />中
        </ToggleButton>
        <ToggleButton size="lg">
          <Heart />大
        </ToggleButton>
      </div>
      <div className="flex items-center gap-3">
        <ToggleButton isIconOnly aria-label="点赞" size="sm">
          <Heart />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="点赞" size="md">
          <Heart />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="点赞" size="lg">
          <Heart />
        </ToggleButton>
      </div>
    </div>
  );
}
