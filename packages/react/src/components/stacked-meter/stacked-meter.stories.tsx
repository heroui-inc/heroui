import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Label} from "../label";

import {StackedMeter} from "./index";

const meta: Meta<typeof StackedMeter> = {
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  component: StackedMeter,
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
  title: "Components/Feedback/StackedMeter",
};

export default meta;
type Story = StoryObj<typeof StackedMeter>;

const storageSegments = [
  {id: "photos", value: 45, label: "Photos", color: "accent" as const},
  {id: "videos", value: 20, label: "Videos", color: "success" as const},
  {id: "docs", value: 10, label: "Documents", color: "warning" as const},
  {id: "other", value: 5, label: "Other", color: "default" as const},
];

export const Default: Story = {
  render: (args) => {
    return (
      <StackedMeter
        aria-label="Storage usage"
        maxValue={128}
        segments={storageSegments}
        {...args}
      >
        <Label>Storage</Label>
        <StackedMeter.Output>
          {({total, maxValue, format}) => `${format(total)} / ${format(maxValue)} GB`}
        </StackedMeter.Output>
        <StackedMeter.Track />
        <StackedMeter.Legend />
      </StackedMeter>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex w-full flex-col gap-6">
        <StackedMeter
          aria-label="Small"
          maxValue={100}
          segments={storageSegments}
          size="sm"
          {...args}
        >
          <Label>Small</Label>
          <StackedMeter.Output />
          <StackedMeter.Track />
        </StackedMeter>
        <StackedMeter
          aria-label="Medium"
          maxValue={100}
          segments={storageSegments}
          size="md"
          {...args}
        >
          <Label>Medium</Label>
          <StackedMeter.Output />
          <StackedMeter.Track />
        </StackedMeter>
        <StackedMeter
          aria-label="Large"
          maxValue={100}
          segments={storageSegments}
          size="lg"
          {...args}
        >
          <Label>Large</Label>
          <StackedMeter.Output />
          <StackedMeter.Track />
        </StackedMeter>
      </div>
    );
  },
};

export const WithLegend: Story = {
  render: (args) => {
    return (
      <StackedMeter
        aria-label="Team capacity"
        maxValue={40}
        segments={[
          {id: "eng", value: 18, label: "Engineering", color: "accent"},
          {id: "design", value: 8, label: "Design", color: "success"},
          {id: "pm", value: 6, label: "Product", color: "warning"},
          {id: "qa", value: 4, label: "QA", color: "danger"},
        ]}
        {...args}
      >
        <Label>Team Capacity</Label>
        <StackedMeter.Output>
          {({total, maxValue}) => `${total} / ${maxValue} people`}
        </StackedMeter.Output>
        <StackedMeter.Track />
        <StackedMeter.Legend />
      </StackedMeter>
    );
  },
};

export const CustomFormat: Story = {
  render: (args) => {
    return (
      <StackedMeter
        aria-label="Budget allocation"
        formatOptions={{style: "currency", currency: "USD", maximumFractionDigits: 0}}
        maxValue={50000}
        segments={[
          {id: "marketing", value: 20000, label: "Marketing", color: "accent"},
          {id: "engineering", value: 15000, label: "Engineering", color: "success"},
          {id: "operations", value: 8000, label: "Operations", color: "warning"},
          {id: "misc", value: 3000, label: "Miscellaneous", color: "default"},
        ]}
        {...args}
      >
        <Label>Budget</Label>
        <StackedMeter.Output />
        <StackedMeter.Track />
        <StackedMeter.Legend />
      </StackedMeter>
    );
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    return (
      <StackedMeter aria-label="Disk usage" maxValue={100} segments={storageSegments} {...args}>
        <StackedMeter.Track />
      </StackedMeter>
    );
  },
};
