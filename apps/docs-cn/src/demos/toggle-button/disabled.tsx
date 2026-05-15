import {Heart, HeartFill} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isDisabled>
        <Heart />
        点赞
      </ToggleButton>
      <ToggleButton defaultSelected isDisabled>
        <HeartFill />
        点赞
      </ToggleButton>
    </div>
  );
}
