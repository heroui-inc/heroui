import {Checkbox} from "@heroui/react";

export function DefaultSelected() {
  return (
    <Checkbox defaultSelected id="default-notifications">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        启用邮件通知
      </Checkbox.Content>
    </Checkbox>
  );
}
