import {Checkbox, Description} from "@heroui/react";

export function WithDescription() {
  return (
    <Checkbox name="description-notifications">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Email notifications
      </Checkbox.Content>
      <Description>Get notified when someone mentions you in a comment</Description>
    </Checkbox>
  );
}
