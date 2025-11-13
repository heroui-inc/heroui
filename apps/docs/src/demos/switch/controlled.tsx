"use client";

import {Label, Switch} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Switch isSelected={isSelected} onChange={setIsSelected}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Enable notifications</Label>
      </Switch>
      <p className="text-muted text-sm">Switch is {isSelected ? "on" : "off"}</p>
    </div>
  );
}
