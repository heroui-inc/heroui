"use client";

import {ColorArea, ColorSwatch} from "@heroui/react";
import {useState} from "react";
import {parseColor} from "react-aria-components";

export function ColorAreaControlled() {
  const [color, setColor] = useState(parseColor("hsl(50, 100%, 50%)"));

  return (
    <div className="flex flex-col gap-4">
      <ColorArea value={color} onChange={setColor}>
        <ColorArea.Thumb />
      </ColorArea>
      <div className="flex w-[300px] items-center gap-3">
        <ColorSwatch color={color.toString("css")} size="md" />
        <p className="text-sm text-muted">
          Current color: <span className="font-medium">{color.toString("hsl")}</span>
        </p>
      </div>
    </div>
  );
}
