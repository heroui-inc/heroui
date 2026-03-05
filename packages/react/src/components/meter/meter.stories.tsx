import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Label} from "../label";

import {Meter} from "./index";

const meta: Meta<typeof Meter> = {
  argTypes: {
    color: {
      control: "select",
      options: ["default", "accent", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  component: Meter,
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
  title: "Components/Feedback/Meter",
};

export default meta;
type Story = StoryObj<typeof Meter>;

export const Default: Story = {
  render: (args) => {
    return (
      <Meter value={60} {...args}>
        <Label>Storage</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex w-full flex-col gap-6">
        <Meter size="sm" value={40} {...args}>
          <Label>Small</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
        <Meter size="md" value={60} {...args}>
          <Label>Medium</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
        <Meter size="lg" value={80} {...args}>
          <Label>Large</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
      </div>
    );
  },
};

export const Colors: Story = {
  render: (args) => {
    return (
      <div className="flex w-full flex-col gap-6">
        <Meter color="default" value={50} {...args}>
          <Label>Default</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
        <Meter color="accent" value={50} {...args}>
          <Label>Accent</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
        <Meter color="success" value={50} {...args}>
          <Label>Success</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
        <Meter color="warning" value={50} {...args}>
          <Label>Warning</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
        <Meter color="danger" value={50} {...args}>
          <Label>Danger</Label>
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
      </div>
    );
  },
};

export const CustomValue: Story = {
  render: (args) => {
    return (
      <Meter
        formatOptions={{style: "currency", currency: "USD"}}
        maxValue={1000}
        minValue={0}
        value={750}
        {...args}
      >
        <Label>Revenue</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
    );
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    return (
      <Meter aria-label="Storage usage" value={45} {...args}>
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
    );
  },
};
