import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Radio} from "./index";

export default {
  argTypes: {},
  component: Radio.Root,
  title: "Components/Forms/Radio",
} as Meta<typeof Radio.Root>;

type Story = StoryObj<typeof Radio.Root>;

export const Default: Story = {
  render: () => (
    <Radio.Root value="basic">
      <Radio.Control>
        <Radio.Indicator />
      </Radio.Control>
    </Radio.Root>
  ),
};
