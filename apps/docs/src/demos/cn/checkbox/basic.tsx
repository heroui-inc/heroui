import {Checkbox, Label} from "@heroui/react";

export function Basic() {
  return (
    <Checkbox name="basic-terms">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>接受条款与条件</Label>
      </Checkbox.Button>
    </Checkbox>
  );
}
