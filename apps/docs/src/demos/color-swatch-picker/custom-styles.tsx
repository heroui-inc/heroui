import {ColorSwatchPicker} from "@heroui/react";

const colors = ["#52525b", "#78716c", "#a1a1aa", "#d4d4d8", "#e5e5e5"];

export function CustomStyles() {
  return (
    <ColorSwatchPicker className="gap-2 rounded-xl border border-border/80 bg-surface p-3 ring-1 ring-black/5 dark:ring-white/10">
      {colors.map((color) => (
        <ColorSwatchPicker.Item key={color} color={color}>
          <ColorSwatchPicker.Swatch className="size-8 rounded-lg ring-1 ring-neutral-300/60 transition-transform hover:scale-110 dark:ring-neutral-600/60" />
          <ColorSwatchPicker.Indicator className="text-neutral-700 dark:text-neutral-300" />
        </ColorSwatchPicker.Item>
      ))}
    </ColorSwatchPicker>
  );
}
