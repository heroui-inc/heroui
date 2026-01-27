import {ColorSwatchPicker} from "@heroui/react";

export function Disabled() {
  const colors = ["#F43F5E", "#D946EF", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#84CC16"];

  return (
    <ColorSwatchPicker>
      {colors.map((color) => (
        <ColorSwatchPicker.Item key={color} isDisabled color={color} />
      ))}
    </ColorSwatchPicker>
  );
}
