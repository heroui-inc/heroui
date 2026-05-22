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
          <Switch.Content>
            <Label className="text-sm">{isSelected ? "已开启" : "已关闭"}</Label>
          </Switch.Content>
        </>
      )}
    </Switch>
  );
}
