"use client";

import {Label, Switch} from "@heroui/react";

export function Basic() {
  return (
    <Switch>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label className="text-sm font-normal">Enable notifications</Label>
    </Switch>
  );
}
