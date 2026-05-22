import {Heart} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton>
        <Heart />
        默认
      </ToggleButton>
      <ToggleButton variant="ghost">
        <Heart />
        幽灵
      </ToggleButton>
    </div>
  );
}
