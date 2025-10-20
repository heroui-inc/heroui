"use client";

import {
  Label,
  SwitchControl,
  SwitchGroupItems,
  SwitchGroupRoot,
  SwitchRoot,
  SwitchThumb,
} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroupRoot>
      <SwitchGroupItems>
        <SwitchRoot name="notifications">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Allow Notifications</Label>
        </SwitchRoot>
        <SwitchRoot name="marketing">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Marketing emails</Label>
        </SwitchRoot>
        <SwitchRoot name="social">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Social media updates</Label>
        </SwitchRoot>
      </SwitchGroupItems>
    </SwitchGroupRoot>
  );
}
