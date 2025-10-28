import {Label, SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <SwitchRoot isSelected={isSelected} onChange={setIsSelected}>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-sm">Enable notifications</Label>
      </SwitchRoot>
      <p className="text-muted text-sm">SwitchRoot is {isSelected ? "on" : "off"}</p>
    </div>
  );
}
