"use client";

import type {ColorChannel, ColorSpace} from "@heroui/react";

import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Label,
  ListBox,
  Select,
} from "@heroui/react";
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

export function WithFields() {
  const [colorSpace, setColorSpace] = useState<ColorSpace>("hsl");

  const colorChannelsByColorSpace: Record<ColorSpace, ColorChannel[]> = {
    hsb: ["hue", "saturation", "brightness"],
    hsl: ["hue", "saturation", "lightness"],
    rgb: ["red", "green", "blue"],
  };

  return (
    <ColorPicker defaultValue="hsla(220, 90%, 50%, 0.8)">
      <ColorPicker.Trigger>
        <ColorSwatch size="lg" />
        <Label>选择颜色</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover className="max-w-62 gap-2">
        <ColorArea
          className="max-w-full"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb />
        </ColorArea>
        <ColorSlider channel="hue" className="gap-1 px-1" colorSpace="hsb">
          <Label>色相</Label>
          <ColorSlider.Output className="text-muted" />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
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
        <div className="grid w-full grid-cols-3 items-center gap-2">
          {colorChannelsByColorSpace[colorSpace].map((channel) => (
            <ColorField
              key={channel}
              aria-label={CHANNEL_LABELS[channel]}
              channel={channel}
              colorSpace={colorSpace}
            >
              <ColorField.Group variant="secondary">
                <ColorField.Input />
              </ColorField.Group>
            </ColorField>
          ))}
        </div>
      </ColorPicker.Popover>
    </ColorPicker>
  );
}
