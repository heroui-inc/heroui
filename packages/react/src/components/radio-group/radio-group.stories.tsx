import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {Label} from "../label";

import {Radio, RadioGroup} from "./radio-group";

export default {
  argTypes: {},
  component: RadioGroup,
  title: "Components/Forms/RadioGroup",
} as Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="1" name="plan">
      <Label>Plan selection</Label>
      <Description>Choose the plan that best suits your needs</Description>
      <Radio value="basic">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Basic Plan</Label>
          <Description>Includes 100 messages per month and up to 3 themes to set up</Description>
        </Radio.Content>
      </Radio>
      <Radio value="premium">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Premium Plan</Label>
          <Description>Includes 200 messages per month and up to 6 themes to set up</Description>
        </Radio.Content>
      </Radio>
      <Radio value="business">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Business Plan</Label>
          <Description>Unlimited messages and themes</Description>
        </Radio.Content>
      </Radio>
    </RadioGroup>
  ),
};
