import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

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
