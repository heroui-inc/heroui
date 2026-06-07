import {Checkbox, Description} from "@heroui/react";

export function WithDescription() {
  return (
    <Checkbox name="description-notifications">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        邮件通知
      </Checkbox.Content>
      <Description>当有人在评论中提及您时收到通知</Description>
    </Checkbox>
  );
}
