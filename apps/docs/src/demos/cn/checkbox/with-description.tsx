import {Checkbox, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <Checkbox id="description-notifications">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="description-notifications">邮件通知</Label>
        <Description>当有人在评论中@你时收到通知</Description>
      </Checkbox.Content>
    </Checkbox>
  );
}
