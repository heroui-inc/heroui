"use client";

import type {Color} from "@heroui/react";

import {ColorField, ColorSwatch, Label, parseColor} from "@heroui/react";
import {useState} from "react";

export function ChannelEditing() {
  const [color, setColor] = useState<Color | null>(parseColor("#7F007F"));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">Edit individual HSL channels:</p>
      <div className="flex gap-4">
        <ColorField
          channel="hue"
          className="w-[100px]"
          colorSpace="hsl"
          name="hue"
          value={color}
          onChange={setColor}
        >
          <Label>Hue</Label>
          <ColorField.Group>
            <ColorField.Input />
          </ColorField.Group>
        </ColorField>
        <ColorField
          channel="saturation"
          className="w-[100px]"
          colorSpace="hsl"
          name="saturation"
          value={color}
          onChange={setColor}
        >
          <Label>Saturation</Label>
          <ColorField.Group>
            <ColorField.Input />
            <ColorField.Suffix>
              <span className="text-sm text-muted">%</span>
            </ColorField.Suffix>
          </ColorField.Group>
        </ColorField>
        <ColorField
          channel="lightness"
          className="w-[100px]"
          colorSpace="hsl"
          name="lightness"
          value={color}
          onChange={setColor}
        >
          <Label>Lightness</Label>
          <ColorField.Group>
            <ColorField.Input />
            <ColorField.Suffix>
              <span className="text-sm text-muted">%</span>
            </ColorField.Suffix>
          </ColorField.Group>
        </ColorField>
      </div>
      <div className="flex items-center gap-2">
        <ColorSwatch color={color ?? undefined} size="md" />
        <span className="text-sm">Current: {color ? color.toString("hex") : "(empty)"}</span>
      </div>
    </div>
  );
}
