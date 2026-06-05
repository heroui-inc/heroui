"use client";

import {Label, Switch} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <Switch render={(props) => <div {...props} data-custom="foo" />}>
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">启用通知</Label>
      </Switch.Button>
    </Switch>
  );
}
