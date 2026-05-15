import {ColorSlider} from "@heroui/react";

export function Vertical() {
  return (
    <div className="flex h-48 gap-4">
      <ColorSlider
        aria-label="色相"
        channel="hue"
        defaultValue="hsl(0, 100%, 50%)"
        orientation="vertical"
      >
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <ColorSlider
        aria-label="饱和度"
        channel="saturation"
        defaultValue="hsl(0, 100%, 50%)"
        orientation="vertical"
      >
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <ColorSlider
        aria-label="明度"
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
