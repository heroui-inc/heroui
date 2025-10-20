"use client";

import {Label, Switch, SwitchControl, SwitchThumb} from "@heroui/react";

export function Basic() {
  return (
    <Switch>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <Label className="text-sm">Enable notifications</Label>
    </Switch>
  );
}
