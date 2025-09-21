"use client";

import {Switch} from "@heroui/react";

export function DefaultSelected() {
  return (
    <Switch defaultSelected>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  );
}
