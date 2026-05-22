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
        <Switch.Content>
          <Label className="text-sm">启用通知</Label>
        </Switch.Content>
      </Switch>
      <p className="text-sm text-muted">开关{isSelected ? "已打开" : "已关闭"}</p>
    </div>
  );
}
