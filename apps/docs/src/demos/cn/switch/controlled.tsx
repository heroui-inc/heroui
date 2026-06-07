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
          启用通知
        </Switch.Content>
      </Switch>
      <p className="text-sm text-muted">开关{isSelected ? "已打开" : "已关闭"}</p>
    </div>
  );
}
