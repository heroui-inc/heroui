"use client";

import {Checkbox} from "@heroui/react";

export function RenderFunction() {
  return (
    <Checkbox render={(props) => <div {...props} data-custom="bar" />}>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        接受条款与条件
      </Checkbox.Content>
    </Checkbox>
  );
}
