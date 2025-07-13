import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {FieldError} from "../fieldset";
import {Label} from "../label";

import {Radio, RadioGroup} from "./radio";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="1">
      <Label>Select an option</Label>
      <RadioGroup.Items>
        <Radio.Root value="1">
          <Radio.Indicator />
          <Radio.Label>Option 1</Radio.Label>
        </Radio.Root>
        <Radio.Root value="2">
          <Radio.Indicator />
          <Radio.Label>Option 2</Radio.Label>
        </Radio.Root>
        <Radio.Root value="3">
          <Radio.Indicator />
          <Radio.Label>Option 3</Radio.Label>
        </Radio.Root>
      </RadioGroup.Items>
    </RadioGroup.Root>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="small" orientation="horizontal">
      <Label>Choose size</Label>
      <RadioGroup.Items>
        <Radio.Root value="small">
          <Radio.Indicator />
          <Radio.Label>Small</Radio.Label>
        </Radio.Root>
        <Radio.Root value="medium">
          <Radio.Indicator />
          <Radio.Label>Medium</Radio.Label>
        </Radio.Root>
        <Radio.Root value="large">
          <Radio.Indicator />
          <Radio.Label>Large</Radio.Label>
        </Radio.Root>
      </RadioGroup.Items>
    </RadioGroup.Root>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="basic">
      <Label>Select your plan</Label>
      <Description>Choose the plan that best fits your needs</Description>
      <RadioGroup.Items>
        <Radio.Root value="basic">
          <Radio.Indicator />
          <Radio.Label>Basic</Radio.Label>
        </Radio.Root>
        <Radio.Root value="premium">
          <Radio.Indicator />
          <Radio.Label>Premium</Radio.Label>
        </Radio.Root>
        <Radio.Root value="business">
          <Radio.Indicator />
          <Radio.Label>Business</Radio.Label>
        </Radio.Root>
      </RadioGroup.Items>
    </RadioGroup.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup.Root isDisabled defaultValue="1">
        <Label>Disabled group</Label>
        <RadioGroup.Items>
          <Radio.Root value="1">
            <Radio.Indicator />
            <Radio.Label>Option 1</Radio.Label>
          </Radio.Root>
          <Radio.Root value="2">
            <Radio.Indicator />
            <Radio.Label>Option 2</Radio.Label>
          </Radio.Root>
        </RadioGroup.Items>
      </RadioGroup.Root>

      <RadioGroup.Root defaultValue="1">
        <Label>Individual disabled</Label>
        <RadioGroup.Items>
          <Radio.Root value="1">
            <Radio.Indicator />
            <Radio.Label>Option 1</Radio.Label>
          </Radio.Root>
          <Radio.Root isDisabled value="2">
            <Radio.Indicator />
            <Radio.Label>Option 2 (disabled)</Radio.Label>
          </Radio.Root>
          <Radio.Root value="3">
            <Radio.Indicator />
            <Radio.Label>Option 3</Radio.Label>
          </Radio.Root>
        </RadioGroup.Items>
      </RadioGroup.Root>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup.Root isInvalid isRequired>
      <Label>Select your preference</Label>
      <RadioGroup.Items>
        <Radio.Root value="yes">
          <Radio.Indicator />
          <Radio.Label>Yes</Radio.Label>
        </Radio.Root>
        <Radio.Root value="no">
          <Radio.Indicator />
          <Radio.Label>No</Radio.Label>
        </Radio.Root>
      </RadioGroup.Items>
      <FieldError>Please select an option</FieldError>
    </RadioGroup.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("red");

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup.Root value={value} onChange={setValue}>
          <Label>Select a color</Label>
          <RadioGroup.Items>
            <Radio.Root value="red">
              <Radio.Indicator />
              <Radio.Label>Red</Radio.Label>
            </Radio.Root>
            <Radio.Root value="green">
              <Radio.Indicator />
              <Radio.Label>Green</Radio.Label>
            </Radio.Root>
            <Radio.Root value="blue">
              <Radio.Indicator />
              <Radio.Label>Blue</Radio.Label>
            </Radio.Root>
          </RadioGroup.Items>
        </RadioGroup.Root>
        <p className="text-muted-foreground text-sm">Selected: {value}</p>
      </div>
    );
  },
};

export const LongLabels: Story = {
  render: () => (
    <RadioGroup.Root className="max-w-md" defaultValue="1">
      <Label>Terms and Conditions</Label>
      <RadioGroup.Items>
        <Radio.Root value="1">
          <Radio.Indicator />
          <Radio.Label>
            I agree to receive marketing emails and understand that I can unsubscribe at any time
          </Radio.Label>
        </Radio.Root>
        <Radio.Root value="2">
          <Radio.Indicator />
          <Radio.Label>
            I prefer not to receive marketing emails but would like to stay informed about my
            account
          </Radio.Label>
        </Radio.Root>
      </RadioGroup.Items>
    </RadioGroup.Root>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="1">
      <Label>Custom styled options</Label>
      <RadioGroup.Items>
        <Radio.Root className="hover:bg-muted/50 rounded-lg border p-4" value="1">
          <Radio.Indicator />
          <Radio.Label className="font-semibold">Premium Plan</Radio.Label>
        </Radio.Root>
        <Radio.Root className="hover:bg-muted/50 rounded-lg border p-4" value="2">
          <Radio.Indicator />
          <Radio.Label className="font-semibold">Basic Plan</Radio.Label>
        </Radio.Root>
      </RadioGroup.Items>
    </RadioGroup.Root>
  ),
};
