"use client";

import {Label, Switch, SwitchControl, SwitchThumb} from "@heroui/react";

export function DefaultSelected() {
  return (
    <Switch defaultSelected>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <Label className="text-sm">Enable notifications</Label>
    </Switch>
  );
}
