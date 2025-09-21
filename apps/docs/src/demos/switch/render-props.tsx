"use client";

import {Switch} from "@heroui/react";

export function RenderProps() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>{isSelected ? "Enabled" : "Disabled"}</Switch.Label>
        </>
      )}
    </Switch>
  );
}
