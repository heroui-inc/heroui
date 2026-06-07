import {Checkbox} from "@heroui/react";

export function Basic() {
  return (
    <Checkbox name="basic-terms">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        接受条款与条件
      </Checkbox.Content>
    </Checkbox>
  );
}
