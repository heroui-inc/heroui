import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

const controlClassName = "bg-success-soft before:bg-success";
const indicatorClassName =
  "**:data-[slot=checkbox-default-indicator--checkmark]:text-success-foreground";

const channels = [
  {label: "Email", value: "email"},
  {label: "SMS", value: "sms"},
  {label: "Push", value: "push"},
] as const;

export function CustomStyles() {
  return (
    <CheckboxGroup
      className="gap-3 **:data-[slot=checkbox]:mt-0"
      defaultValue={["email"]}
      name="notification-channels"
    >
      <Label>Notification channels</Label>
      <Description>Choose how we should reach you for account updates.</Description>
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
