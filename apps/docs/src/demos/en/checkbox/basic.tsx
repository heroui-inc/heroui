import type {CheckboxProps} from "@heroui/react";

import {Checkbox} from "@heroui/react";

export function Basic(props: CheckboxProps) {
  return (
    <Checkbox {...props} name="basic-terms">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Accept terms and conditions
      </Checkbox.Content>
    </Checkbox>
  );
}
