import {CircleXmark, Xmark} from "@gravity-ui/icons";
import {CloseButton} from "@heroui/react";

export function WithCustomIcon() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <CloseButton>
          <CircleXmark />
        </CloseButton>
        <span className="text-xs text-muted">Custom Icon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseButton>
          <Xmark />
        </CloseButton>
        <span className="text-xs text-muted">Alternative Icon</span>
      </div>
    </div>
  );
}
