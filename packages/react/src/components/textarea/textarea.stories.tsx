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

export const OnSurface: Story = {
  render: () => (
    <Surface className="w-full rounded-3xl p-6">
      <TextArea className="w-full min-w-[280px]" placeholder="Describe your product" />
    </Surface>
  ),
};
