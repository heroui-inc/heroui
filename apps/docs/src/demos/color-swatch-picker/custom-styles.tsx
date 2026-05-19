import {ColorSwatchPicker} from "@heroui/react";

const colors = ["#52525b", "#78716c", "#a1a1aa", "#d4d4d8", "#e5e5e5"];

export function CustomStyles() {
  return (
    <ColorSwatchPicker className="gap-2 rounded-xl border border-border bg-surface p-3 ring-1 ring-black/5 dark:ring-white/10">
      {colors.map((color) => (
        <ColorSwatchPicker.Item
          key={color}
          className="rounded-lg! data-[selected=true]:rounded-lg!"
          color={color}
        >
          <ColorSwatchPicker.Swatch className="rounded-lg ring-1 ring-border transition-transform hover:scale-105" />
          <ColorSwatchPicker.Indicator className="mix-blend-difference [&>svg]:text-white!" />
        </ColorSwatchPicker.Item>
      ))}
    </ColorSwatchPicker>
  );
}
