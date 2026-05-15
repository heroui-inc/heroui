import {Checkbox, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <Checkbox id="custom">
      <Checkbox.Control className="border-2 border-purple-500 data-[selected=true]:border-purple-500 data-[selected=true]:bg-purple-500">
        <Checkbox.Indicator className="text-white" />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="custom">自定义样式复选框</Label>
      </Checkbox.Content>
    </Checkbox>
  );
}
