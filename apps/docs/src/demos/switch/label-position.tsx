"use client";

import {Switch} from "@heroui/react";

export function LabelPosition() {
  return (
    <div className="flex flex-col gap-4">
      <Switch>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Label after</Switch.Label>
      </Switch>
      <Switch>
        <Switch.Label>Label before</Switch.Label>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    </div>
  );
}
