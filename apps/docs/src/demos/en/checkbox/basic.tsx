import {Checkbox, Label} from "@heroui/react";

export function Basic() {
  return (
    <Checkbox name="basic-terms">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>Accept terms and conditions</Label>
      </Checkbox.Button>
    </Checkbox>
  );
}
