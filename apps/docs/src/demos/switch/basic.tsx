"use client";

import {Label, SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";

export function Basic() {
  return (
    <SwitchRoot>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <Label className="text-sm">Enable notifications</Label>
    </SwitchRoot>
  );
}
