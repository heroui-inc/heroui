"use client";

import {SwitchControl, SwitchRoot, SwitchThumb} from "@heroui/react";

export function WithoutLabel() {
  return (
    <SwitchRoot aria-label="Enable notifications">
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
    </SwitchRoot>
  );
}
