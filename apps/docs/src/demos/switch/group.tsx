"use client";

import {
  Label,
  Switch,
  SwitchControl,
  SwitchGroup,
  SwitchGroupItems,
  SwitchThumb,
} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroup>
      <SwitchGroupItems>
        <Switch name="notifications">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Allow Notifications</Label>
        </Switch>
        <Switch name="marketing">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Marketing emails</Label>
        </Switch>
        <Switch name="social">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Social media updates</Label>
        </Switch>
      </SwitchGroupItems>
    </SwitchGroup>
  );
}
