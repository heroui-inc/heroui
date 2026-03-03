import {ToggleButton} from "@heroui/react";
import {Icon} from "@iconify/react";

export function IconOnly() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isIconOnly aria-label="Like">
        <Icon icon="gravity-ui:heart" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Bookmark" variant="ghost">
        <Icon icon="gravity-ui:bookmark" />
      </ToggleButton>
    </div>
  );
}
