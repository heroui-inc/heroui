import {Checkbox, Label} from "@heroui/react";

export function DefaultSelected() {
  return (
    <Checkbox defaultSelected id="default-notifications">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="default-notifications">Enable email notifications</Label>
      </Checkbox.Content>
    </Checkbox>
  );
}
