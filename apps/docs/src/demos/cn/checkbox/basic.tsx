import type {CheckboxProps} from "@heroui/react";

import {Checkbox} from "@heroui/react";

export function Basic(props: CheckboxProps) {
  return (
    <Checkbox {...props} name="basic-terms">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        接受条款与条件
      </Checkbox.Content>
    </Checkbox>
  );
}
