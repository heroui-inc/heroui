import {ColorSwatchPicker} from "@heroui/react";

export function Disabled() {
  return (
    <ColorSwatchPicker>
      <ColorSwatchPicker.Item color="#F43F5E" />
      <ColorSwatchPicker.Item isDisabled color="#D946EF" />
      <ColorSwatchPicker.Item color="#8B5CF6" />
      <ColorSwatchPicker.Item isDisabled color="#3B82F6" />
      <ColorSwatchPicker.Item color="#06B6D4" />
      <ColorSwatchPicker.Item color="#10B981" />
      <ColorSwatchPicker.Item color="#84CC16" />
    </ColorSwatchPicker>
  );
}
