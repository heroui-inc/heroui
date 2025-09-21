"use client";

import {Switch} from "@heroui/react";

export function Basic() {
  return (
    <Switch>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  );
}
