import {ColorSlider, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <ColorSlider channel="hue" className="w-full max-w-xs" defaultValue="hsl(220, 70%, 50%)">
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Hue</Label>
      <ColorSlider.Output className="text-muted tabular-nums" />
      <ColorSlider.Track className="ring-1 ring-neutral-300/60 dark:ring-neutral-600/60">
        <ColorSlider.Thumb className="ring-1 ring-neutral-400/40 dark:ring-neutral-500/50" />
      </ColorSlider.Track>
    </ColorSlider>
  );
}
