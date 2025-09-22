"use client";

import {Label, Switch} from "@heroui/react";

export function RenderProps() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>{isSelected ? "Enabled" : "Disabled"}</Label>
        </>
      )}
    </Switch>
  );
}
