import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Label} from "../label";

import {Slider} from "./index";

const meta: Meta<typeof Slider> = {
  argTypes: {
    isDisabled: {
      control: {type: "boolean"},
    },
    orientation: {
      control: {type: "select"},
      options: ["horizontal", "vertical"],
    },
  },
  component: Slider,
  decorators: [
    (Story) => (
      <div className="w-96 p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Controls/Slider",
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => {
    return (
      <Slider defaultValue={30} {...args}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    );
  },
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div className="h-96 p-8">
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    return (
      <Slider defaultValue={30} orientation="vertical" {...args}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Slider isDisabled defaultValue={30} {...args}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    );
  },
};

export const Range: Story = {
  render: (args) => {
    return (
      <Slider
        defaultValue={[100, 500]}
        formatOptions={{style: "currency", currency: "USD"}}
        maxValue={1000}
        minValue={0}
        step={50}
        {...args}
      >
        <Label>Price Range</Label>
        <Slider.Output />
        <Slider.Track>
          {({state}) => (
            <>
              <Slider.Fill />
              {state.values.map((_, i) => (
                <Slider.Thumb key={i} index={i} />
              ))}
            </>
          )}
        </Slider.Track>
      </Slider>
    );
  },
};
