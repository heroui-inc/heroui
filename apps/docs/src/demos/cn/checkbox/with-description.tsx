import {Checkbox, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <Checkbox name="description-notifications">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>邮件通知</Label>
      </Checkbox.Button>
      <Description>当有人在评论中提及您时收到通知</Description>
    </Checkbox>
  );
}
