import {Checkbox} from "@heroui/react";

export function CustomStyles() {
  return (
    <Checkbox id="custom">
      <Checkbox.Content>
        <Checkbox.Control className="bg-success-soft before:bg-success">
          <Checkbox.Indicator className="**:data-[slot=checkbox-default-indicator--checkmark]:text-success-foreground" />
        </Checkbox.Control>
        自定义样式复选框
      </Checkbox.Content>
    </Checkbox>
  );
}
