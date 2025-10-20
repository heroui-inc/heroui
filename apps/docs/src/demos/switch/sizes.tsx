"use client";

import {Label, SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex gap-6">
      <SwitchRoot size="sm">
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-xs">Small</Label>
      </SwitchRoot>
      <SwitchRoot size="md">
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-sm">Medium</Label>
      </SwitchRoot>
      <SwitchRoot size="lg">
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <Label className="text-base">Large</Label>
      </SwitchRoot>
    </div>
  );
}
