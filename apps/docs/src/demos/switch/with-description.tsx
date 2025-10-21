"use client";

import {Description, Label, SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <SwitchRoot>
        <div className="flex gap-3">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <div className="flex flex-col gap-1">
            <Label className="text-sm">Public profile</Label>
            <Description>Allow others to see your profile information</Description>
          </div>
        </div>
      </SwitchRoot>
    </div>
  );
}
