"use client";

import {Label, Switch} from "@heroui/react";

export function Basic() {
  return (
    <Switch>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label>Enable notifications</Label>
    </Switch>
  );
}
