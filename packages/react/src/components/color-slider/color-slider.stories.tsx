import type {Meta, StoryObj} from "@storybook/react";

import React, {useState} from "react";

import {ColorSwatch} from "../color-swatch";
import {Label} from "../label";
import {parseColor} from "../rac";

import {ColorSlider} from "./index";

const meta: Meta<typeof ColorSlider> = {
  argTypes: {
    isDisabled: {
      control: {type: "boolean"},
    },
    colorSpace: {
      control: {type: "select"},
      options: ["hsl", "hsb", "rgb"],
    },
    channel: {
      control: {type: "select"},
      options: ["hue", "saturation", "brightness", "lightness", "alpha", "red", "green", "blue"],
    },
    orientation: {
      control: {type: "select"},
      options: ["horizontal", "vertical"],
    },
  },
  component: ColorSlider,
  decorators: [
    (Story) => (
      <div className="w-64 p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Colors/ColorSlider",
};

export default meta;
type Story = StoryObj<typeof ColorSlider>;

export const Default: Story = {
  args: {
    channel: "hue",
    defaultValue: "hsl(0, 100%, 50%)",
    isDisabled: false,
    orientation: "horizontal",
    colorSpace: "hsl",
  },
  render: (args) => {
    const isVertical = args.orientation === "vertical";

    return (
      <div className={isVertical ? "h-64" : undefined}>
        <ColorSlider {...args}>
          <Label>Hue</Label>
          <ColorSlider.Output />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      </div>
    );
  },
};

export const SaturationChannel: Story = {
  args: {
    channel: "saturation",
    defaultValue: "hsl(0, 100%, 50%)",
    colorSpace: "hsl",
  },
  render: (args) => {
    return (
      <ColorSlider {...args}>
        <Label>Saturation</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
    );
  },
};

export const LightnessChannel: Story = {
  args: {
    channel: "lightness",
    defaultValue: "hsl(0, 100%, 50%)",
    colorSpace: "hsl",
  },
  render: (args) => {
    return (
      <ColorSlider {...args}>
        <Label>Lightness</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
    );
  },
};

export const AlphaChannel: Story = {
  args: {
    channel: "alpha",
    defaultValue: "hsla(0, 100%, 50%, 0.5)",
    colorSpace: "hsl",
  },
  render: (args) => {
    return (
      <ColorSlider {...args}>
        <Label>Alpha</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
    );
  },
};

export const RGBChannels: Story = {
  render: (_args) => {
    const [color, setColor] = useState(parseColor("rgb(255, 0, 0)"));

    return (
      <div className="flex flex-col gap-4">
        <ColorSlider channel="red" colorSpace="rgb" value={color} onChange={setColor}>
          <Label>Red</Label>
          <ColorSlider.Output />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
        <ColorSlider channel="green" colorSpace="rgb" value={color} onChange={setColor}>
          <Label>Green</Label>
          <ColorSlider.Output />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
        <ColorSlider channel="blue" colorSpace="rgb" value={color} onChange={setColor}>
          <Label>Blue</Label>
          <ColorSlider.Output />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      </div>
    );
  },
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div className="flex h-64 gap-8 p-8">
        <Story />
      </div>
    ),
  ],
  render: (_args) => {
    return (
      <>
        <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)" orientation="vertical">
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
        <ColorSlider channel="saturation" defaultValue="hsl(0, 100%, 50%)" orientation="vertical">
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
        <ColorSlider channel="lightness" defaultValue="hsl(0, 100%, 50%)" orientation="vertical">
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      </>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    channel: "hue",
    defaultValue: "hsl(200, 100%, 50%)",
  },
  render: (args) => {
    return (
      <ColorSlider {...args}>
        <Label>Hue</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledColorSlider(_args) {
    const [color, setColor] = React.useState(parseColor("hsl(0, 100%, 50%)"));

    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-[200px] flex-col gap-4">
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
        </div>
        <div className="mt-3 flex w-[350px] items-center gap-3">
          <ColorSwatch color={color} size="lg" />
          <p className="text-sm text-muted">
            Current color: <span className="font-mono">{color.toString("hsl")}</span>
          </p>
        </div>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  args: {
    channel: "hue",
    defaultValue: "hsl(200, 100%, 50%)",
    "aria-label": "Hue",
  },
  render: (args) => {
    return (
      <ColorSlider {...args}>
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
    );
  },
};
