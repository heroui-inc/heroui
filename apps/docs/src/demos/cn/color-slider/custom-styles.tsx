import {ColorSlider, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <ColorSlider channel="hue" className="w-full max-w-sm" defaultValue="hsl(220, 70%, 50%)">
      <Label className="font-medium text-foreground">色相</Label>
      <ColorSlider.Output className="text-muted tabular-nums" />
      <ColorSlider.Track className="h-4! rounded-none! ring-1 ring-border [&::after]:rounded-r-sm! [&::before]:rounded-l-sm!">
        <ColorSlider.Thumb className="size-4 rounded-sm! border-2 border-background shadow-md ring-1 ring-black/10 dark:ring-white/20" />
      </ColorSlider.Track>
    </ColorSlider>
  );
}
