"use client";

import {Label, Switch, SwitchControl, SwitchThumb} from "@heroui/react";

export function RenderProps() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">{isSelected ? "Enabled" : "Disabled"}</Label>
        </>
      )}
    </Switch>
  );
}
