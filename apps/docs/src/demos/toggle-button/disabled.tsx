import {ToggleButton} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Disabled() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isDisabled>
        <Icon icon="gravity-ui:heart" />
        Like
      </ToggleButton>
      <ToggleButton defaultSelected isDisabled>
        <Icon icon="gravity-ui:heart-fill" />
        Like
      </ToggleButton>
    </div>
  );
}
