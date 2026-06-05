"use client";

import {Label, Switch} from "@heroui/react";

export function RenderProps() {
  return (
    <Switch>
      {({isSelected}) => (
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">{isSelected ? "已开启" : "已关闭"}</Label>
        </Switch.Button>
      )}
    </Switch>
  );
}
