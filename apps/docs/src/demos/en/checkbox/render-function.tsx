"use client";

import {Checkbox} from "@heroui/react";

export function RenderFunction() {
  return (
    <Checkbox render={(props) => <div {...props} data-custom="bar" />}>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Accept terms and conditions
      </Checkbox.Content>
    </Checkbox>
  );
}
