import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Label} from "../label";

import {ProgressCircle} from "./index";

const meta: Meta<typeof ProgressCircle> = {
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
  component: ProgressCircle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Feedback/ProgressCircle",
};

export default meta;
type Story = StoryObj<typeof ProgressCircle>;

export const Default: Story = {
  render: (args) => {
    return (
      <ProgressCircle aria-label="Loading" value={60} {...args}>
        <ProgressCircle.Track />
        <ProgressCircle.Output />
      </ProgressCircle>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex items-center gap-6">
        <ProgressCircle aria-label="Loading" size="sm" value={40} {...args}>
          <ProgressCircle.Track />
          <ProgressCircle.Output />
        </ProgressCircle>
        <ProgressCircle aria-label="Loading" size="md" value={60} {...args}>
          <ProgressCircle.Track />
          <ProgressCircle.Output />
        </ProgressCircle>
        <ProgressCircle aria-label="Loading" size="lg" value={80} {...args}>
          <ProgressCircle.Track />
          <ProgressCircle.Output />
        </ProgressCircle>
      </div>
    );
  },
};

export const Colors: Story = {
  render: (args) => {
    return (
      <div className="flex items-center gap-6">
        <ProgressCircle aria-label="Loading" color="default" value={60} {...args}>
          <ProgressCircle.Track />
        </ProgressCircle>
        <ProgressCircle aria-label="Loading" color="accent" value={60} {...args}>
          <ProgressCircle.Track />
        </ProgressCircle>
        <ProgressCircle aria-label="Loading" color="success" value={60} {...args}>
          <ProgressCircle.Track />
        </ProgressCircle>
        <ProgressCircle aria-label="Loading" color="warning" value={60} {...args}>
          <ProgressCircle.Track />
        </ProgressCircle>
        <ProgressCircle aria-label="Loading" color="danger" value={60} {...args}>
          <ProgressCircle.Track />
        </ProgressCircle>
      </div>
    );
  },
};

export const Indeterminate: Story = {
  render: (args) => {
    return (
      <ProgressCircle isIndeterminate aria-label="Loading" {...args}>
        <ProgressCircle.Track />
      </ProgressCircle>
    );
  },
};

export const WithLabel: Story = {
  render: (args) => {
    return (
      <div className="flex items-center gap-3">
        <ProgressCircle aria-label="Loading" value={75} {...args}>
          <ProgressCircle.Track />
        </ProgressCircle>
        <Label>75% Complete</Label>
      </div>
    );
  },
};
