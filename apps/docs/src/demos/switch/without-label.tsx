"use client";

import {Switch, SwitchControl, SwitchThumb} from "@heroui/react";

export function WithoutLabel() {
  return (
    <Switch aria-label="Enable notifications">
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
    </Switch>
  );
}
