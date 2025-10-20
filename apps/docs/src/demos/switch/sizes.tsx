"use client";

import {Label, Switch, SwitchControl, SwitchThumb} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex gap-6">
      <Switch size="sm">
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-xs">Small</Label>
      </Switch>
      <Switch size="md">
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-sm">Medium</Label>
      </Switch>
      <Switch size="lg">
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-base">Large</Label>
      </Switch>
    </div>
  );
}
