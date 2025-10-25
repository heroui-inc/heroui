import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {Label} from "../label";

import {Checkbox} from "./index";

export default {
  argTypes: {},
  component: Checkbox.Root,
  title: "Components/Forms/Checkbox",
} as Meta<typeof Checkbox.Root>;

type Story = StoryObj<typeof Checkbox.Root>;

export const Default: Story = {
  render: () => (
    <div className="px-4">
      <Checkbox.Root name="terms">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Accept terms and conditions</Label>
        </Checkbox.Content>
      </Checkbox.Root>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="px-4">
      <Checkbox.Root name="terms">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Accept terms and conditions</Label>
          <Description>I agree to the terms and privacy policy</Description>
        </Checkbox.Content>
      </Checkbox.Root>
    </div>
  ),
};

export const WithCustomIndicator: Story = {
  render: () => (
    <div className="px-4">
      <Checkbox.Root name="notifications">
        <Checkbox.Control>
          <Checkbox.Indicator>
            <svg
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Email notifications</Label>
          <Description>Receive updates via email</Description>
        </Checkbox.Content>
      </Checkbox.Root>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [isIndeterminate, setIsIndeterminate] = React.useState(true);
    const [isSelected, setIsSelected] = React.useState(false);

    return (
      <div className="px-4">
        <Checkbox.Root
          isIndeterminate={isIndeterminate}
          isSelected={isSelected}
          name="select-all"
          onChange={(selected: boolean) => {
            setIsSelected(selected);
            setIsIndeterminate(false);
          }}
        >
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Select all</Label>
            <Description>Shows indeterminate state</Description>
          </Checkbox.Content>
        </Checkbox.Root>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="px-4">
      <Checkbox.Root isDisabled name="feature">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Feature</Label>
          <Description>This feature is coming soon</Description>
        </Checkbox.Content>
      </Checkbox.Root>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isSelected, setIsSelected] = React.useState(true);

    return (
      <div className="flex flex-col gap-3 px-4">
        <Checkbox.Root isSelected={isSelected} name="notifications" onChange={setIsSelected}>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Email notifications</Label>
          </Checkbox.Content>
        </Checkbox.Root>
        <p className="text-muted mt-2 text-sm">
          Status: <span className="font-medium">{isSelected ? "Enabled" : "Disabled"}</span>
        </p>
      </div>
    );
  },
};

export const RenderProps: Story = {
  render: () => (
    <Checkbox.Root name="terms">
      {({isSelected}) => (
        <>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>{isSelected ? "Terms accepted" : "Accept terms"}</Label>
            <Description>
              {isSelected ? "Thank you for accepting" : "Please read and accept the terms"}
            </Description>
          </Checkbox.Content>
        </>
      )}
    </Checkbox.Root>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Checkbox.Root isInvalid name="agreement">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label>I agree to the terms</Label>
        <Description>You must accept the terms to continue</Description>
      </Checkbox.Content>
    </Checkbox.Root>
  ),
};
