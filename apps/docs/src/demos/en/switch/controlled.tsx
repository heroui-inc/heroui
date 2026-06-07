"use client";

import {Switch} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Switch isSelected={isSelected} onChange={setIsSelected}>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Enable notifications
        </Switch.Content>
      </Switch>
      <p className="text-sm text-muted">Switch is {isSelected ? "on" : "off"}</p>
    </div>
  );
}
