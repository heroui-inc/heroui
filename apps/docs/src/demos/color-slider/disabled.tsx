import {ColorSlider, Label} from "@heroui/react";

export function Disabled() {
  return (
    <ColorSlider
      isDisabled
      channel="hue"
      className="w-full max-w-xs"
      defaultValue="hsl(200, 100%, 50%)"
    >
      <Label>Hue</Label>
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  );
}
