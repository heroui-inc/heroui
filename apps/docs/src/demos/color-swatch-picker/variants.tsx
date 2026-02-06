import {ColorSwatchPicker} from "@heroui/react";

const colors = ["#F43F5E", "#D946EF", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#84CC16"];

export function Variants() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Circle (default)</span>
        <ColorSwatchPicker variant="circle">
          {colors.map((color) => (
            <ColorSwatchPicker.Item key={color} color={color}>
              <ColorSwatchPicker.Swatch />
              <ColorSwatchPicker.Indicator />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Square</span>
        <ColorSwatchPicker variant="square">
          {colors.map((color) => (
            <ColorSwatchPicker.Item key={color} color={color}>
              <ColorSwatchPicker.Swatch />
              <ColorSwatchPicker.Indicator />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>
      </div>
    </div>
  );
}
