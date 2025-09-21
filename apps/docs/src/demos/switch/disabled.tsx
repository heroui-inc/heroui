"use client";

import {Switch} from "@heroui/react";

export function Disabled() {
  return (
    <Switch isDisabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  );
}
