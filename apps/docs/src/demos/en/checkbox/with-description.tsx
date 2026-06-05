import {Checkbox, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <Checkbox name="description-notifications">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>Email notifications</Label>
      </Checkbox.Button>
      <Description>Get notified when someone mentions you in a comment</Description>
    </Checkbox>
  );
}
