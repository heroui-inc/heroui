"use client";

import {ColorSlider, ColorSwatch, Label} from "@heroui/react";
import {useState} from "react";
import {parseColor} from "react-aria-components";

export function Channels() {
  const [color, setColor] = useState(parseColor("hsl(0, 100%, 50%)"));

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <ColorSlider channel="hue" value={color} onChange={setColor}>
        <Label>Hue</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <ColorSlider channel="saturation" value={color} onChange={setColor}>
        <Label>Saturation</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <ColorSlider channel="lightness" value={color} onChange={setColor}>
        <Label>Lightness</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <div className="flex items-center gap-2">
        <ColorSwatch color={color} size="sm" />
        <p className="text-sm text-muted">
          Current color: <code className="font-mono">{color.toString("hsl")}</code>
        </p>
      </div>
    </div>
  );
}
