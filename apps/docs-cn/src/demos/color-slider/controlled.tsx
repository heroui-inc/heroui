"use client";

import {ColorSlider, ColorSwatch, Label} from "@heroui/react";
import {useState} from "react";
import {parseColor} from "react-aria-components";

export function Controlled() {
  const [color, setColor] = useState(parseColor("hsl(200, 100%, 50%)"));

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <ColorSlider channel="hue" value={color} onChange={setColor}>
        <Label>色相</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <div className="flex items-center gap-2">
        <ColorSwatch color={color} size="sm" />
        <p className="text-sm text-muted">
          当前颜色：<code className="font-mono">{color.toString("hsl")}</code>
        </p>
      </div>
    </div>
  );
}
