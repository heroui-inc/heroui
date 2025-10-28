import {Label, SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";

export function LabelPosition() {
  return (
    <div className="flex flex-col gap-4">
      <SwitchRoot>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-sm">Label after</Label>
      </SwitchRoot>
      <SwitchRoot>
        <Label className="text-sm">Label before</Label>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
      </SwitchRoot>
    </div>
  );
}
