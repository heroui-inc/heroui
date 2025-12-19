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

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-3">
      <TextArea fullWidth placeholder="Full width textarea" />
      <Surface className="w-full rounded-3xl p-6">
        <TextArea fullWidth isOnSurface placeholder="Full width textarea on surface" />
      </Surface>
    </div>
  ),
};

export const OnSurface: Story = {
  render: () => (
    <Surface className="w-full rounded-3xl p-6">
      <TextArea className="w-full min-w-[280px]" placeholder="Describe your product" />
    </Surface>
  ),
};
