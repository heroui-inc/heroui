import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {TextArea} from "./index";

export default {
  argTypes: {},
  component: TextArea,
  title: "Components/Forms/Textarea",
} as Meta<typeof TextArea>;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  render: () => <TextArea placeholder="Describe your product" />,
};
