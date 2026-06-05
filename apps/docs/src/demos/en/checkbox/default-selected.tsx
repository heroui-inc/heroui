import {Checkbox, Label} from "@heroui/react";

export function DefaultSelected() {
  return (
    <Checkbox defaultSelected id="default-notifications">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>Enable email notifications</Label>
      </Checkbox.Button>
    </Checkbox>
  );
}
