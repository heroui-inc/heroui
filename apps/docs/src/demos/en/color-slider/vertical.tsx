import {ColorSlider} from "@heroui/react";

export function Vertical() {
  return (
    <div className="flex h-48 gap-4">
      <ColorSlider
        aria-label="Hue"
        channel="hue"
        defaultValue="hsl(0, 100%, 50%)"
        orientation="vertical"
      >
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <ColorSlider
        aria-label="Saturation"
        channel="saturation"
        defaultValue="hsl(0, 100%, 50%)"
        orientation="vertical"
      >
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <ColorSlider
        aria-label="Lightness"
        channel="lightness"
        defaultValue="hsl(0, 100%, 50%)"
        orientation="vertical"
      >
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
    </div>
  );
}
