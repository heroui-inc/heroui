import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Input} from "../input";

import {Field} from "./field";

const meta: Meta<typeof Field> = {
  component: Field,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "📝 ToDo/Field",
};

export default meta;
type Story = StoryObj<typeof Field>;

export const WithInput: Story = {
  render: () => {
    return (
      <Field>
        <Field.Label>Your name</Field.Label>
        <Input className="w-[280px]" name="full_name" placeholder="Your name" />
        <Field.Description className="text-muted text-sm">
          We'll never share this with anyone else
        </Field.Description>
      </Field>
    );
  },
};
