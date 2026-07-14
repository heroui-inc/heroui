import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

const controlClassName = "bg-success-soft before:bg-success";
const indicatorClassName =
  "**:data-[slot=checkbox-default-indicator--checkmark]:text-success-foreground";

const channels = [
  {label: "电子邮件", value: "email"},
  {label: "短信", value: "sms"},
  {label: "推送", value: "push"},
] as const;

export function CustomStyles() {
  return (
    <CheckboxGroup
      className="gap-3 **:data-[slot=checkbox]:mt-0"
      defaultValue={["email"]}
      name="notification-channels"
    >
      <Label>通知渠道</Label>
      <Description>选择我们通过何种方式向您发送账户更新。</Description>
      {channels.map(({label, value}) => (
        <Checkbox key={value} value={value}>
          <Checkbox.Content>
            <Checkbox.Control className={controlClassName}>
              <Checkbox.Indicator className={indicatorClassName} />
            </Checkbox.Control>
            {label}
          </Checkbox.Content>
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
