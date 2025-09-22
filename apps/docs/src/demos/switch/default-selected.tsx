"use client";

import {Label, Switch} from "@heroui/react";

export function DefaultSelected() {
  return (
    <Switch defaultSelected>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label>Enable notifications</Label>
    </Switch>
  );
}
