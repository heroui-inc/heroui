import {ColorSwatchPicker} from "@heroui/react";

const colors = ["#F43F5E", "#D946EF", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#84CC16"];

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 text-sm text-muted">{size}</span>
          <ColorSwatchPicker size={size}>
            {colors.map((color) => (
              <ColorSwatchPicker.Item key={color} color={color} />
            ))}
          </ColorSwatchPicker>
        </div>
      ))}
    </div>
  );
}
