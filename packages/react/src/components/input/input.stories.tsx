import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Surface} from "../surface";

import {Input} from "./index";

export default {
  argTypes: {},
  component: Input,
  parameters: {
    layout: "centered",
  },
  title: "Components/Forms/Input",
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <Input placeholder="Your name" />,
};

export const OnSurface: Story = {
  render: () => (
    <div className="bg-surface flex h-[180px] w-[280px] items-center justify-center rounded-3xl p-4">
      <Surface className="w-full">
        <Input className="w-full" placeholder="Your name" />
      </Surface>
    </div>
  ),
};
