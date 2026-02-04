import type {ColorChannel, ColorSpace} from "../rac";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";
import {parseColor} from "react-aria-components";

import {Button} from "../button";
import {ColorArea} from "../color-area";
import {ColorField} from "../color-field";
import {ColorInputGroup} from "../color-input-group";
import {ColorSlider} from "../color-slider";
import {ColorSwatch} from "../color-swatch";
import {ColorSwatchPicker} from "../color-swatch-picker";
import {Label} from "../label";
import {ListBox} from "../list-box";
import {Select} from "../select";

import {ColorPicker} from "./index";

const colorPresets = [
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#eab308", // yellow-500
  "#22c55e", // green-500
  "#06b6d4", // cyan-500
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
];

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Colors/ColorPicker",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ColorPicker defaultValue="#0485F7">
      <ColorPicker.Trigger>
        <ColorSwatch size="lg" />
        <Label>Pick a color</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover>
        <ColorArea
          aria-label="Color area"
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
      </ColorPicker.Popover>
    </ColorPicker>
  ),
};

export const Controlled: Story = {
  render: function ControlledColorPicker() {
    const [color, setColor] = React.useState(parseColor("#325578"));

    const shuffleColor = () => {
      const randomHue = Math.floor(Math.random() * 360);
      const randomSaturation = 50 + Math.floor(Math.random() * 50); // 50-100%
      const randomLightness = 40 + Math.floor(Math.random() * 30); // 40-70%

      setColor(parseColor(`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`));
    };

    return (
      <div className="flex flex-col gap-4">
        <ColorPicker value={color} onChange={setColor}>
          <ColorPicker.Trigger>
            <ColorSwatch size="lg" />
            <Label>Pick a color</Label>
          </ColorPicker.Trigger>
          <ColorPicker.Popover className="gap-2">
            <ColorSwatchPicker className="justify-center pt-2" size="xs">
              {colorPresets.map((preset) => (
                <ColorSwatchPicker.Item key={preset} color={preset}>
                  <ColorSwatchPicker.Swatch />
                </ColorSwatchPicker.Item>
              ))}
            </ColorSwatchPicker>
            <ColorArea
              aria-label="Color area"
              className="max-w-full"
              colorSpace="hsb"
              xChannel="saturation"
              yChannel="brightness"
            >
              <ColorArea.Thumb />
            </ColorArea>
            <div className="flex items-center gap-2 px-1">
              <ColorSlider
                aria-label="Hue slider"
                channel="hue"
                className="flex-1"
                colorSpace="hsb"
              >
                <ColorSlider.Track>
                  <ColorSlider.Thumb />
                </ColorSlider.Track>
              </ColorSlider>
              <Button
                isIconOnly
                aria-label="Shuffle color"
                size="sm"
                variant="tertiary"
                onPress={shuffleColor}
              >
                <Icon className="size-4" icon="gravity-ui:shuffle" />
              </Button>
            </div>
            <ColorField aria-label="Color field">
              <ColorInputGroup variant="secondary">
                <ColorInputGroup.Prefix>
                  <ColorSwatch size="xs" />
                </ColorInputGroup.Prefix>
                <ColorInputGroup.Input />
              </ColorInputGroup>
            </ColorField>
          </ColorPicker.Popover>
        </ColorPicker>
        <p className="w-60 text-sm text-muted">
          Selected: <span className="font-medium">{color.toString("hex")}</span>
        </p>
      </div>
    );
  },
};

export const WithSwatches: Story = {
  render: () => {
    return (
      <ColorPicker defaultValue="#F43F5E">
        <ColorPicker.Trigger>
          <ColorSwatch size="lg" />
          <Label>Brand Color</Label>
        </ColorPicker.Trigger>
        <ColorPicker.Popover>
          <ColorArea
            aria-label="Color area"
            className="max-w-full"
            colorSpace="hsb"
            xChannel="saturation"
            yChannel="brightness"
          >
            <ColorArea.Thumb />
          </ColorArea>
          <ColorSlider
            aria-label="Hue slider"
            channel="hue"
            className="gap-1 px-1"
            colorSpace="hsb"
          >
            <Label>Hue</Label>
            <ColorSlider.Output className="text-muted" />
            <ColorSlider.Track>
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>
          <ColorSwatchPicker className="justify-center px-1" size="xs">
            {colorPresets.map((preset) => (
              <ColorSwatchPicker.Item key={preset} color={preset}>
                <ColorSwatchPicker.Swatch />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
        </ColorPicker.Popover>
      </ColorPicker>
    );
  },
};

export const WidthFields: Story = {
  render: () => {
    const [colorSpace, setColorSpace] = React.useState<ColorSpace>("hsl");

    const colorChannelsByColorSpace: Record<ColorSpace, ColorChannel[]> = {
      hsl: ["hue", "saturation", "lightness"],
      hsb: ["hue", "saturation", "brightness"],
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
            aria-label="Color area"
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
  },
};

export const WithSliders: Story = {
  render: () => {
    const [colorSpace, setColorSpace] = React.useState<ColorSpace>("hsl");

    const colorChannelsByColorSpace: Record<ColorSpace, ColorChannel[]> = {
      hsl: ["hue", "saturation", "lightness", "alpha"],
      hsb: ["hue", "saturation", "brightness", "alpha"],
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
  },
};
