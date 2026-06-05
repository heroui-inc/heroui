"use client";

import {Label, Switch} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <Switch render={(props) => <div {...props} data-custom="foo" />}>
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Enable notifications</Label>
      </Switch.Button>
    </Switch>
  );
}
