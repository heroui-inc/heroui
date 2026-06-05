import {Checkbox, Label} from "@heroui/react";

export function DefaultSelected() {
  return (
    <Checkbox defaultSelected id="default-notifications">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>启用邮件通知</Label>
      </Checkbox.Button>
    </Checkbox>
  );
}
