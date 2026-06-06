"use client";

import {Checkbox, Label} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="basic-terms" render={(props) => <div {...props} data-custom="bar" />}>
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox.Content>
      </Checkbox>
      <Label htmlFor="basic-terms">接受条款与条件</Label>
    </div>
  );
}
