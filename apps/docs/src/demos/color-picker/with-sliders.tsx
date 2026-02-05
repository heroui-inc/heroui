"use client";

import type {ColorChannel, ColorSpace} from "@heroui/react";

import {ColorPicker, ColorSlider, ColorSwatch, Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

export function WithSliders() {
  const [colorSpace, setColorSpace] = useState<ColorSpace>("hsl");

  const colorChannelsByColorSpace: Record<ColorSpace, ColorChannel[]> = {
    hsb: ["hue", "saturation", "brightness", "alpha"],
    hsl: ["hue", "saturation", "lightness", "alpha"],
    rgb: ["red", "green", "blue", "alpha"],
  };

  return (
    <ColorPicker defaultValue="hsl(219, 58%, 93%)">
      <ColorPicker.Trigger>
        <ColorSwatch size="lg" />
        <Label>Pick a color</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover className="max-w-62 gap-2 px-2 py-3">
        <Select
          aria-label="Color space"
          value={colorSpace}
          variant="secondary"
          onChange={(value) => setColorSpace(value as ColorSpace)}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {Object.keys(colorChannelsByColorSpace).map((space) => (
                <ListBox.Item key={space} id={space} textValue={space}>
                  {space}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <div className="flex flex-col gap-2">
          {colorChannelsByColorSpace[colorSpace].map((channel: ColorChannel) => (
            // @ts-expect-error - TypeScript can't correlate dynamic colorSpace with channel type
            <ColorSlider
              key={channel}
              aria-label={channel}
              channel={channel}
              className="gap-1 px-1"
              colorSpace={colorSpace}
            >
              <Label>{channel}</Label>
              <ColorSlider.Output className="text-muted" />
              <ColorSlider.Track>
                <ColorSlider.Thumb />
              </ColorSlider.Track>
            </ColorSlider>
          ))}
        </div>
      </ColorPicker.Popover>
    </ColorPicker>
  );
}
