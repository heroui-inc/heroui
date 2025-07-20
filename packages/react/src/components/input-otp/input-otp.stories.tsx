import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {Label} from "../label";
import {Text} from "../text";

import {InputOTP} from "./input-otp";

const meta: Meta<typeof InputOTP> = {
  title: "Components/InputOTP",
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
    maxLength: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  render: (args) => (
    <InputOTP {...args} maxLength={6}>
      <InputOTP.Group>
        <InputOTP.Slot />
        <InputOTP.Slot />
        <InputOTP.Slot />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot />
        <InputOTP.Slot />
        <InputOTP.Slot />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Label>Verify account</Label>
      <Description size="sm">We&apos;ve sent a code to a****@gmail.com</Description>
      <InputOTP {...args} maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
      <div className="flex items-center gap-[5px] px-1 pt-1">
        <Text size="xs" variant="muted">
          Didn&apos;t receive a code?
        </Text>
        <button className="text-foreground text-xs font-medium underline">Resend</button>
      </div>
    </div>
  ),
};

export const Required: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Label required>Verify account</Label>
      <InputOTP {...args} maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </div>
  ),
};

export const FourDigits: Story = {
  render: (args) => (
    <InputOTP {...args} maxLength={4}>
      <InputOTP.Group>
        <InputOTP.Slot />
        <InputOTP.Slot />
        <InputOTP.Slot />
        <InputOTP.Slot />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
  render: (args) => (
    <div className="w-[280px]">
      <Label>Verify account</Label>
      <InputOTP {...args} maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
      <Text className="px-1 pt-1" size="xs" variant="danger">
        Invalid code, please try again
      </Text>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <div className="w-[280px]">
      <Label disabled>Verify account</Label>
      <InputOTP {...args} maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </div>
  ),
};

export const WithPattern: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Label>Enter code (numbers only)</Label>
      <InputOTP {...args} maxLength={6} pattern="^[0-9]+$">
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </div>
  ),
};

export const OnComplete: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    const [isComplete, setIsComplete] = React.useState(false);

    return (
      <div className="w-[280px]">
        <Label>Verify account</Label>
        <InputOTP
          {...args}
          maxLength={6}
          value={value}
          onChange={setValue}
          onComplete={(code) => {
            setIsComplete(true);
            // eslint-disable-next-line no-console
            console.log("Code complete:", code);
          }}
        >
          <InputOTP.Group>
            <InputOTP.Slot />
            <InputOTP.Slot />
            <InputOTP.Slot />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot />
            <InputOTP.Slot />
            <InputOTP.Slot />
          </InputOTP.Group>
        </InputOTP>
        {!!isComplete && (
          <Text className="mt-2" size="sm" variant="success">
            Code submitted successfully!
          </Text>
        )}
      </div>
    );
  },
};
