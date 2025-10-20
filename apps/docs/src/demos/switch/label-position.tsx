"use client";

import {Label, Switch, SwitchControl, SwitchThumb} from "@heroui/react";

export function LabelPosition() {
  return (
    <div className="flex flex-col gap-4">
      <Switch>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-sm">Label after</Label>
      </Switch>
      <Switch>
        <Label className="text-sm">Label before</Label>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
      </Switch>
    </div>
  );
}
