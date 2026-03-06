import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Label} from "../label";

import {ProgressBar} from "./index";

const meta: Meta<typeof ProgressBar> = {
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
  component: ProgressBar,
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
  title: "Components/Feedback/ProgressBar",
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  render: (args) => {
    return (
      <ProgressBar value={60} {...args}>
        <Label>Loading</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex w-full flex-col gap-6">
        <ProgressBar size="sm" value={40} {...args}>
          <Label>Small</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <ProgressBar size="md" value={60} {...args}>
          <Label>Medium</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <ProgressBar size="lg" value={80} {...args}>
          <Label>Large</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      </div>
    );
  },
};

export const Colors: Story = {
  render: (args) => {
    return (
      <div className="flex w-full flex-col gap-6">
        <ProgressBar color="default" value={50} {...args}>
          <Label>Default</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <ProgressBar color="accent" value={50} {...args}>
          <Label>Accent</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <ProgressBar color="success" value={50} {...args}>
          <Label>Success</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <ProgressBar color="warning" value={50} {...args}>
          <Label>Warning</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <ProgressBar color="danger" value={50} {...args}>
          <Label>Danger</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      </div>
    );
  },
};

export const Indeterminate: Story = {
  render: (args) => {
    return (
      <ProgressBar isIndeterminate {...args}>
        <Label>Loading...</Label>
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    );
  },
};

export const CustomValue: Story = {
  render: (args) => {
    return (
      <ProgressBar
        formatOptions={{style: "currency", currency: "USD"}}
        maxValue={1000}
        minValue={0}
        value={750}
        {...args}
      >
        <Label>Revenue</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    );
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    return (
      <ProgressBar aria-label="Loading progress" value={45} {...args}>
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    );
  },
};
