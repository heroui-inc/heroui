import {ColorSwatchPicker} from "@heroui/react";

const colors = ["#F43F5E", "#D946EF", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#84CC16"];

export function CustomStyles() {
  return (
    <ColorSwatchPicker
      className="rounded-2xl border border-border/80 bg-surface p-4 shadow-sm ring-1 ring-accent/5"
      defaultValue="#8B5CF6"
      variant="square"
    >
      {colors.map((color) => (
        <ColorSwatchPicker.Item key={`custom-styles-${color}`} color={color}>
          <ColorSwatchPicker.Swatch />
          <ColorSwatchPicker.Indicator />
        </ColorSwatchPicker.Item>
      ))}
    </ColorSwatchPicker>
  );
}
