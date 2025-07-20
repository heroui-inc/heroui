import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {FieldError} from "../fieldset";
import {Label} from "../label";

import {Radio, RadioGroup} from "./radio";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <Label>Select an option</Label>
      <RadioGroup.Items>
        <Radio value="1">
          <Radio.Indicator />
          <Radio.Label>Option 1</Radio.Label>
        </Radio>
        <Radio value="2">
          <Radio.Indicator />
          <Radio.Label>Option 2</Radio.Label>
        </Radio>
        <Radio value="3">
          <Radio.Indicator />
          <Radio.Label>Option 3</Radio.Label>
        </Radio>
      </RadioGroup.Items>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="small" orientation="horizontal">
      <Label>Choose size</Label>
      <RadioGroup.Items>
        <Radio value="small">
          <Radio.Indicator />
          <Radio.Label>Small</Radio.Label>
        </Radio>
        <Radio value="medium">
          <Radio.Indicator />
          <Radio.Label>Medium</Radio.Label>
        </Radio>
        <Radio value="large">
          <Radio.Indicator />
          <Radio.Label>Large</Radio.Label>
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
          <Radio.Label>Basic</Radio.Label>
        </Radio>
        <Radio value="premium">
          <Radio.Indicator />
          <Radio.Label>Premium</Radio.Label>
        </Radio>
        <Radio value="business">
          <Radio.Indicator />
          <Radio.Label>Business</Radio.Label>
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
            <Radio.Label>Option 1</Radio.Label>
          </Radio>
          <Radio value="2">
            <Radio.Indicator />
            <Radio.Label>Option 2</Radio.Label>
          </Radio>
        </RadioGroup.Items>
      </RadioGroup>

      <RadioGroup defaultValue="1">
        <Label>Individual disabled</Label>
        <RadioGroup.Items>
          <Radio value="1">
            <Radio.Indicator />
            <Radio.Label>Option 1</Radio.Label>
          </Radio>
          <Radio isDisabled value="2">
            <Radio.Indicator />
            <Radio.Label>Option 2 (disabled)</Radio.Label>
          </Radio>
          <Radio value="3">
            <Radio.Indicator />
            <Radio.Label>Option 3</Radio.Label>
          </Radio>
        </RadioGroup.Items>
      </RadioGroup>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup isInvalid isRequired>
      <Label>Select your preference</Label>
      <RadioGroup.Items>
        <Radio value="yes">
          <Radio.Indicator />
          <Radio.Label>Yes</Radio.Label>
        </Radio>
        <Radio value="no">
          <Radio.Indicator />
          <Radio.Label>No</Radio.Label>
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
              <Radio.Label>Red</Radio.Label>
            </Radio>
            <Radio value="green">
              <Radio.Indicator />
              <Radio.Label>Green</Radio.Label>
            </Radio>
            <Radio value="blue">
              <Radio.Indicator />
              <Radio.Label>Blue</Radio.Label>
            </Radio>
          </RadioGroup.Items>
        </RadioGroup>
        <p className="text-muted-foreground text-sm">Selected: {value}</p>
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
          <Radio.Label>
            I agree to receive marketing emails and understand that I can unsubscribe at any time
          </Radio.Label>
        </Radio>
        <Radio value="2">
          <Radio.Indicator />
          <Radio.Label>
            I prefer not to receive marketing emails but would like to stay informed about my
            account
          </Radio.Label>
        </Radio>
      </RadioGroup.Items>
    </RadioGroup>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <Label>Custom styled options</Label>
      <RadioGroup.Items>
        <Radio className="hover:bg-muted/50 rounded-lg border p-4" value="1">
          <Radio.Indicator />
          <Radio.Label className="font-semibold">Premium Plan</Radio.Label>
        </Radio>
        <Radio className="hover:bg-muted/50 rounded-lg border p-4" value="2">
          <Radio.Indicator />
          <Radio.Label className="font-semibold">Basic Plan</Radio.Label>
        </Radio>
      </RadioGroup.Items>
    </RadioGroup>
  ),
};
