import {ToggleButton} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Variants() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton>
        <Icon icon="gravity-ui:heart" />
        Default
      </ToggleButton>
      <ToggleButton variant="ghost">
        <Icon icon="gravity-ui:heart" />
        Ghost
      </ToggleButton>
    </div>
  );
}
