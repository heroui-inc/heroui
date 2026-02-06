"use client";

import type {ColorChannel, ColorSpace} from "@heroui/react";

import {
  ColorArea,
  ColorField,
  ColorInputGroup,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Label,
  ListBox,
  Select,
} from "@heroui/react";
import {useState} from "react";

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
        <Label>Pick a color</Label>
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
          <Label>Hue</Label>
          <ColorSlider.Output className="text-muted" />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
        <Select
          aria-label="Color space"
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
              aria-label={channel}
              channel={channel}
              colorSpace={colorSpace}
            >
              <ColorInputGroup variant="secondary">
                <ColorInputGroup.Input />
              </ColorInputGroup>
            </ColorField>
          ))}
        </div>
      </ColorPicker.Popover>
    </ColorPicker>
  );
}
