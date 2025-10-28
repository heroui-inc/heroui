import {Label, SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";

export function RenderProps() {
  return (
    <SwitchRoot>
      {({isSelected}) => (
        <>
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">{isSelected ? "Enabled" : "Disabled"}</Label>
        </>
      )}
    </SwitchRoot>
  );
}
