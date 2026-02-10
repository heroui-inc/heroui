import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Surface} from "../surface";

import {TextArea} from "./index";

export default {
  argTypes: {},
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  title: "Components/Forms/Textarea",
} as Meta<typeof TextArea>;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  render: () => <TextArea placeholder="Describe your product" />,
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-[280px] flex-col gap-2">
      <TextArea fullWidth placeholder="Primary textarea" variant="primary" />
      <TextArea fullWidth placeholder="Secondary textarea" variant="secondary" />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-3">
      <TextArea fullWidth placeholder="Full width textarea" />
      <Surface className="w-full rounded-3xl p-6">
        <TextArea fullWidth placeholder="Full width textarea on surface" variant="secondary" />
      </Surface>
    </div>
  ),
};
