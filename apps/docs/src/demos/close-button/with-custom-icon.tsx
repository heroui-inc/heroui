import {CloseButton} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithCustomIcon() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <CloseButton>
          <Icon icon="gravity-ui:circle-xmark" />
        </CloseButton>
        <span className="text-xs text-muted">Custom Icon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseButton>
          <Icon icon="gravity-ui:xmark" />
        </CloseButton>
        <span className="text-xs text-muted">Alternative Icon</span>
      </div>
    </div>
  );
}
