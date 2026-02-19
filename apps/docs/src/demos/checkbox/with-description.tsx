import {Checkbox, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <Checkbox className="mt-0.5" id="description-notifications">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="description-notifications">Email notifications</Label>
        <Description>Get notified when someone mentions you in a comment</Description>
      </Checkbox.Content>
    </Checkbox>
  );
}
