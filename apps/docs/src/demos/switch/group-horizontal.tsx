"use client";

import {
  Label,
  Switch,
  SwitchControl,
  SwitchGroup,
  SwitchGroupItems,
  SwitchThumb,
} from "@heroui/react";

export function GroupHorizontal() {
  return (
    <SwitchGroup className="overflow-x-auto" orientation="horizontal">
      <SwitchGroupItems>
        <Switch name="notifications">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Notifications</Label>
        </Switch>
        <Switch name="marketing">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Marketing</Label>
        </Switch>
        <Switch name="social">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Social</Label>
        </Switch>
      </SwitchGroupItems>
    </SwitchGroup>
  );
}
