import type {ToggleButtonProps} from "@heroui/react";

import {Heart} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";

export function Basic(props: ToggleButtonProps) {
  return (
    <ToggleButton {...props}>
      <Heart />
      Like
    </ToggleButton>
  );
}
