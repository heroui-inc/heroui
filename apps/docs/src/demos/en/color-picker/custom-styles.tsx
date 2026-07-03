import {ColorArea, ColorPicker, ColorSlider, ColorSwatch, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <ColorPicker defaultValue="#52525b">
      <ColorPicker.Trigger className="gap-3 rounded-xl border border-border/80 bg-surface px-3 py-2 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        <ColorSwatch className="ring-1 ring-neutral-300/80 dark:ring-neutral-600" size="lg" />
        <Label className="font-medium text-neutral-800 dark:text-neutral-100">Theme color</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover className="rounded-2xl border border-border/80 bg-surface p-3 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
        <ColorArea
          aria-label="Color area"
          className="max-w-full rounded-lg ring-1 ring-neutral-200/80 dark:ring-neutral-700/80"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb className="size-4 border-2 border-white shadow-md dark:border-neutral-900" />
        </ColorArea>
        <ColorSlider channel="hue" className="gap-1 px-1 pt-3" colorSpace="hsb">
          <Label className="text-sm text-neutral-700 dark:text-neutral-300">Hue</Label>
          <ColorSlider.Output className="text-muted tabular-nums" />
          <ColorSlider.Track className="ring-1 ring-neutral-300/60 dark:ring-neutral-600/60">
            <ColorSlider.Thumb className="ring-1 ring-neutral-400/40 dark:ring-neutral-500/50" />
          </ColorSlider.Track>
        </ColorSlider>
      </ColorPicker.Popover>
    </ColorPicker>
  );
}
