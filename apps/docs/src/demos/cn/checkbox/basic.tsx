import {Checkbox, Label} from "@heroui/react";

export function Basic() {
  return (
    <Checkbox id="basic-terms">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="basic-terms">接受条款与条件</Label>
      </Checkbox.Content>
    </Checkbox>
  );
}
