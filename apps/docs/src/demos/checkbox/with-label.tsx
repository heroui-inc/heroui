import {Checkbox, Label} from "@heroui/react";

export function WithLabel() {
  return (
    <Checkbox id="marketing">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="marketing">Send me marketing emails</Label>
      </Checkbox.Content>
    </Checkbox>
  );
}
