import {ToggleButton} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <ToggleButton size="sm">
          <Icon icon="gravity-ui:heart" />
          Small
        </ToggleButton>
        <ToggleButton size="md">
          <Icon icon="gravity-ui:heart" />
          Medium
        </ToggleButton>
        <ToggleButton size="lg">
          <Icon icon="gravity-ui:heart" />
          Large
        </ToggleButton>
      </div>
      <div className="flex items-center gap-3">
        <ToggleButton isIconOnly aria-label="Like" size="sm">
          <Icon icon="gravity-ui:heart" />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Like" size="md">
          <Icon icon="gravity-ui:heart" />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Like" size="lg">
          <Icon icon="gravity-ui:heart" />
        </ToggleButton>
      </div>
    </div>
  );
}
