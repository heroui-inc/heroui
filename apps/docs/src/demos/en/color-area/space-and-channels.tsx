"use client";

import type {ColorSpace, Key} from "@heroui/react";

import {ColorArea, Label, ListBox, Select, parseColor} from "@heroui/react";
import {useState} from "react";

type ColorChannel = "hue" | "saturation" | "brightness" | "lightness" | "red" | "green" | "blue";

interface ChannelOption {
  id: ColorChannel;
  name: string;
}

const colorSpaces: Array<{id: ColorSpace; name: string}> = [
  {id: "rgb", name: "RGB"},
  {id: "hsl", name: "HSL"},
  {id: "hsb", name: "HSB"},
];

const channelsBySpace: Record<ColorSpace, ChannelOption[]> = {
  hsb: [
    {id: "hue", name: "Hue"},
    {id: "saturation", name: "Saturation"},
    {id: "brightness", name: "Brightness"},
  ],
  hsl: [
    {id: "hue", name: "Hue"},
    {id: "saturation", name: "Saturation"},
    {id: "lightness", name: "Lightness"},
  ],
  rgb: [
    {id: "red", name: "Red"},
    {id: "green", name: "Green"},
    {id: "blue", name: "Blue"},
  ],
};

export function ColorAreaSpaceAndChannels() {
  const [colorSpace, setColorSpace] = useState<ColorSpace>("hsb");
  const [color, setColor] = useState(() => parseColor("hsb(219, 58%, 93%)"));

  const channels = channelsBySpace[colorSpace];
  const defaultX = colorSpace === "rgb" ? "blue" : "saturation";
  const defaultY =
    colorSpace === "rgb" ? "green" : colorSpace === "hsl" ? "lightness" : "brightness";

  const [xChannel, setXChannel] = useState<ColorChannel>(defaultX);
  const [yChannel, setYChannel] = useState<ColorChannel>(defaultY);

  const handleColorSpaceChange = (newSpace: Key | null) => {
    if (!newSpace) return;
    const space = newSpace as ColorSpace;

    setColorSpace(space);
    // Reset channels to appropriate defaults for the new color space
    if (space === "rgb") {
      setXChannel("blue");
      setYChannel("green");
    } else if (space === "hsl") {
      setXChannel("saturation");
      setYChannel("lightness");
    } else {
      setXChannel("saturation");
      setYChannel("brightness");
    }
  };

  // Filter out the other channel from options (can't have same channel on both axes)
  const xChannelOptions = channels.filter((c) => c.id !== yChannel);
  const yChannelOptions = channels.filter((c) => c.id !== xChannel);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Controls */}
      <div className="flex gap-4">
        {/* Color Space Select */}
        <Select className="w-32" value={colorSpace} onChange={handleColorSpaceChange}>
          <Label>Color Space</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {colorSpaces.map((space) => (
                <ListBox.Item key={space.id} id={space.id} textValue={space.name}>
                  {space.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* X Channel Select */}
        <Select
          className="w-36"
          value={xChannel}
          onChange={(value) => value && setXChannel(value as ColorChannel)}
        >
          <Label>X Axis</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {xChannelOptions.map((channel) => (
                <ListBox.Item key={channel.id} id={channel.id} textValue={channel.name}>
                  {channel.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Y Channel Select */}
        <Select
          className="w-36"
          value={yChannel}
          onChange={(value) => value && setYChannel(value as ColorChannel)}
        >
          <Label>Y Axis</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {yChannelOptions.map((channel) => (
                <ListBox.Item key={channel.id} id={channel.id} textValue={channel.name}>
                  {channel.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
      {/* Color Area */}
      <ColorArea
        colorSpace={colorSpace}
        value={color}
        xChannel={xChannel}
        yChannel={yChannel}
        onChange={setColor}
      >
        <ColorArea.Thumb />
      </ColorArea>

      {/* Color Value Display */}
      <div className="flex items-center gap-3">
        <div
          className="size-8 rounded-md border border-default"
          style={{backgroundColor: color.toString("css")}}
        />
        <code className="rounded bg-default/50 px-2 py-1 text-sm">
          {color.toString(colorSpace)}
        </code>
      </div>
    </div>
  );
}
