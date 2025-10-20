"use client";

import {Label, Switch, SwitchControl, SwitchThumb} from "@heroui/react";

export function Disabled() {
  return (
    <Switch isDisabled>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <Label className="text-sm">Enable notifications</Label>
    </Switch>
  );
}
