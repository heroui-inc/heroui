import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description, Field, FieldError, Label} from "../field";

import {Radio, RadioGroup} from "./radio";

export default {
  argTypes: {},
  component: RadioGroup,
  title: "Components/RadioGroup",
} as Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <Label>Select an option</Label>
      <RadioGroup.Items>
        <Radio value="1">
          <Radio.Indicator />
          <Label>Option 1</Label>
        </Radio>
        <Radio value="2">
          <Radio.Indicator />
          <Label>Option 2</Label>
        </Radio>
        <Radio value="3">
          <Radio.Indicator />
          <Label>Option 3</Label>
        </Radio>
      </RadioGroup.Items>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="1" orientation="horizontal">
      <Label>Select an option</Label>
      <RadioGroup.Items>
        <Radio value="1">
          <Radio.Indicator />
          <Label>Option 1</Label>
        </Radio>
        <Radio value="2">
          <Radio.Indicator />
          <Label>Option 2</Label>
        </Radio>
        <Radio value="3">
          <Radio.Indicator />
          <Label>Option 3</Label>
        </Radio>
      </RadioGroup.Items>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="basic">
      <Label>Select your plan</Label>
      <Description>Choose the plan that best fits your needs</Description>
      <RadioGroup.Items>
        <Radio value="basic">
          <Radio.Indicator />
          <Label>Basic</Label>
        </Radio>
        <Radio value="premium">
          <Radio.Indicator />
          <Label>Premium</Label>
        </Radio>
        <Radio value="business">
          <Radio.Indicator />
          <Label>Business</Label>
        </Radio>
      </RadioGroup.Items>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup isDisabled defaultValue="1">
        <Label>Disabled group</Label>
        <RadioGroup.Items>
          <Radio value="1">
            <Radio.Indicator />
            <Label>Option 1</Label>
          </Radio>
          <Radio value="2">
            <Radio.Indicator />
            <Label>Option 2</Label>
          </Radio>
        </RadioGroup.Items>
      </RadioGroup>

      <RadioGroup defaultValue="1">
        <Label>Individual disabled</Label>
        <RadioGroup.Items>
          <Radio value="1">
            <Radio.Indicator />
            <Label>Option 1</Label>
          </Radio>
          <Radio isDisabled value="2">
            <Radio.Indicator />
            <Label>Option 2 (disabled)</Label>
          </Radio>
          <Radio value="3">
            <Radio.Indicator />
            <Label>Option 3</Label>
          </Radio>
        </RadioGroup.Items>
      </RadioGroup>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup isInvalid isRequired>
      <Label>Select your plan</Label>
      <Description>Choose the plan that best fits your needs</Description>
      <RadioGroup.Items>
        <Radio value="basic">
          <Radio.Indicator />
          <Field>
            <Label>Basic</Label>
            <Description>Includes 100 messages per month and up to 3 themes to set up</Description>
          </Field>
        </Radio>
        <Radio value="premium">
          <Radio.Indicator />
          <Field>
            <Label>Premium</Label>
            <Description>Includes 200 messages per month and up to 6 themes to set up</Description>
          </Field>
        </Radio>
        <Radio value="business">
          <Radio.Indicator />
          <Field>
            <Label>Business</Label>
            <Description>
              Includes 1,000 messages per month and up to unlimited themes to set up
            </Description>
          </Field>
        </Radio>
      </RadioGroup.Items>
      <FieldError>Please select an option</FieldError>
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("red");

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup value={value} onChange={setValue}>
          <Label>Select a color</Label>
          <RadioGroup.Items>
            <Radio value="red">
              <Radio.Indicator />
              <Label>Red</Label>
            </Radio>
            <Radio value="green">
              <Radio.Indicator />
              <Label>Green</Label>
            </Radio>
            <Radio value="blue">
              <Radio.Indicator />
              <Label>Blue</Label>
            </Radio>
          </RadioGroup.Items>
        </RadioGroup>
        <p className="text-muted text-sm">Selected: {value}</p>
      </div>
    );
  },
};

export const LongLabels: Story = {
  render: () => (
    <RadioGroup className="max-w-md" defaultValue="1">
      <Label>Terms and Conditions</Label>
      <RadioGroup.Items>
        <Radio value="1">
          <Radio.Indicator />
          <Label>
            I agree to receive marketing emails and understand that I can unsubscribe at any time
          </Label>
        </Radio>
        <Radio value="2">
          <Radio.Indicator />
          <Label>
            I prefer not to receive marketing emails but would like to stay informed about my
            account
          </Label>
        </Radio>
      </RadioGroup.Items>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup defaultValue="1" orientation="horizontal">
        <Label>Select an option</Label>
        <RadioGroup.Items>
          <Radio size="sm" value="1">
            <Radio.Indicator />
            <Label className="text-xs">Small</Label>
          </Radio>
          <Radio size="md" value="2">
            <Radio.Indicator />
            <Label className="text-sm">Medium</Label>
          </Radio>
          <Radio size="lg" value="3">
            <Radio.Indicator />
            <Label className="text-base">Large</Label>
          </Radio>
        </RadioGroup.Items>
      </RadioGroup>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <Label>Custom styled options</Label>
      <RadioGroup.Items>
        <Radio className="hover:bg-muted/50 rounded-lg border p-4" value="1">
          <Radio.Indicator />
          <Label className="font-semibold">Premium Plan</Label>
        </Radio>
        <Radio className="hover:bg-muted/50 rounded-lg border p-4" value="2">
          <Radio.Indicator />
          <Label className="font-semibold">Basic Plan</Label>
        </Radio>
      </RadioGroup.Items>
    </RadioGroup>
  ),
};
