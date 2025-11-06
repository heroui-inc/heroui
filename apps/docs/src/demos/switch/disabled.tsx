import {Label, SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";

export function Disabled() {
  return (
    <SwitchRoot isDisabled>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <Label className="text-sm">Enable notifications</Label>
    </SwitchRoot>
  );
}
