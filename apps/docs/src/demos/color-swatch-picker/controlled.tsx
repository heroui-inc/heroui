"use client";

import {ColorSwatchPicker, parseColor} from "@heroui/react";
import {useState} from "react";

const colors = ["#F43F5E", "#D946EF", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#84CC16"];

export function Controlled() {
  const [value, setValue] = useState(parseColor("#F43F5E"));

  return (
    <div className="flex flex-col gap-4">
      <ColorSwatchPicker value={value} onChange={setValue}>
        {colors.map((color) => (
          <ColorSwatchPicker.Item key={color} color={color}>
            <ColorSwatchPicker.Swatch />
            <ColorSwatchPicker.Indicator />
          </ColorSwatchPicker.Item>
        ))}
      </ColorSwatchPicker>
      <p className="text-sm text-muted">
        Selected: <span className="font-medium">{value.toString("hex")}</span>
      </p>
    </div>
  );
}
