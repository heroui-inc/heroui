import {Label, SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";

export function DefaultSelected() {
  return (
    <SwitchRoot defaultSelected>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <Label className="text-sm">Enable notifications</Label>
    </SwitchRoot>
  );
}
