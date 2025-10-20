"use client";

import {
  Label,
  SwitchControl,
  SwitchGroupItems,
  SwitchGroupRoot,
  SwitchRoot,
  SwitchThumb,
} from "@heroui/react";

export function GroupHorizontal() {
  return (
    <SwitchGroupRoot className="overflow-x-auto" orientation="horizontal">
      <SwitchGroupItems>
        <SwitchRoot name="notifications">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Notifications</Label>
        </SwitchRoot>
        <SwitchRoot name="marketing">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Marketing</Label>
        </SwitchRoot>
        <SwitchRoot name="social">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <Label className="text-sm">Social</Label>
        </SwitchRoot>
      </SwitchGroupItems>
    </SwitchGroupRoot>
  );
}
