"use client";

import type {ColorChannel, ColorSpace} from "@heroui/react";

import {ColorPicker, ColorSlider, ColorSwatch, Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

const CHANNEL_LABELS: Record<ColorChannel, string> = {
  alpha: "透明度",
  blue: "蓝",
  brightness: "亮度",
  green: "绿",
  hue: "色相",
  lightness: "明度",
  red: "红",
  saturation: "饱和度",
};

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
        <Label>选择颜色</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover className="max-w-62 gap-2 px-2 py-3">
        <Select
          aria-label="色彩空间"
          value={colorSpace}
          variant="secondary"
          onChange={(value) => setColorSpace(value as ColorSpace)}
        >
          <Select.Trigger>
            <Select.Value className="uppercase" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {Object.keys(colorChannelsByColorSpace).map((space) => (
                <ListBox.Item key={space} className="uppercase" id={space} textValue={space}>
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
              aria-label={CHANNEL_LABELS[channel]}
              channel={channel}
              className="gap-1 px-1"
              colorSpace={colorSpace}
            >
              <Label>{CHANNEL_LABELS[channel]}</Label>
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
