import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import clsx from "clsx";
import React from "react";

import {CheckboxGroup} from "../checkbox-group";
import {Description} from "../description";
import {Label} from "../label";

import {Checkbox} from "./index";

export default {
  argTypes: {},
  component: Checkbox.Root,
  parameters: {
    layout: "centered",
  },
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
    <div className="flex gap-4 px-4">
      <Checkbox.Root defaultSelected name="heart">
        <Checkbox.Control>
          <Checkbox.Indicator>
            {({isSelected}) =>
              isSelected ? (
                <svg fill="fill" viewBox="0 0 24 24">
                  <path
                    d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                    fill="currentColor"
                  />
                </svg>
              ) : null
            }
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Heart</Label>
        </Checkbox.Content>
      </Checkbox.Root>
      <Checkbox.Root defaultSelected name="plus">
        <Checkbox.Control>
          <Checkbox.Indicator>
            {({isSelected}) =>
              isSelected ? (
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  <path
                    d="M12 18V6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </svg>
              ) : null
            }
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Plus</Label>
        </Checkbox.Content>
      </Checkbox.Root>
      <Checkbox.Root isIndeterminate name="indeterminate">
        <Checkbox.Control>
          <Checkbox.Indicator>
            {({isIndeterminate}) =>
              isIndeterminate ? (
                <svg stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <line x1="21" x2="3" y1="12" y2="12" />
                </svg>
              ) : null
            }
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Indeterminate</Label>
        </Checkbox.Content>
      </Checkbox.Root>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    return (
      <div className="px-4">
        <Checkbox.Root isIndeterminate name="select-all">
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

export const FullRounded: Story = {
  render: () => (
    <div className="flex flex-col gap-6 px-4">
      <div className="flex flex-col gap-3">
        <Label className="text-muted">Rounded checkboxes</Label>
        <Checkbox.Root
          className="[&_[data-slot='checkbox-default-indicator--checkmark']]:size-2"
          name="small-rounded"
        >
          <Checkbox.Control className="size-3 rounded-full before:rounded-full">
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Small size</Label>
          </Checkbox.Content>
        </Checkbox.Root>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox.Root name="default-rounded">
          <Checkbox.Control className="size-4 rounded-full before:rounded-full">
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Default size</Label>
          </Checkbox.Content>
        </Checkbox.Root>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox.Root name="large-rounded">
          <Checkbox.Control className="size-5 rounded-full before:rounded-full">
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Large size</Label>
          </Checkbox.Content>
        </Checkbox.Root>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox.Root
          className="[&_[data-slot='checkbox-default-indicator--checkmark']]:size-4"
          name="xl-rounded"
        >
          <Checkbox.Control className="size-6 rounded-full before:rounded-full">
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Extra large size</Label>
          </Checkbox.Content>
        </Checkbox.Root>
      </div>
    </div>
  ),
};

export const FeaturesAndAddOnsExample: Story = {
  render: () => {
    const addOns = [
      {
        title: "Email Notifications",
        value: "email",
        description: "Receive updates via email",
        icon: "gravity-ui:envelope",
      },
      {
        title: "SMS Alerts",
        value: "sms",
        description: "Get instant SMS notifications",
        icon: "gravity-ui:comment",
      },
      {
        title: "Push Notifications",
        value: "push",
        description: "Browser and mobile push alerts",
        icon: "gravity-ui:bell",
      },
    ];

    return (
      <div className="flex w-full flex-col items-center gap-10 px-4 py-8">
        <section className="flex w-full min-w-[320px] flex-col gap-4">
          <CheckboxGroup name="notification-preferences">
            <Label>Notification preferences</Label>
            <Description>Choose how you want to receive updates</Description>
            <div className="flex flex-col gap-2">
              {addOns.map((addon) => (
                <Checkbox.Root
                  key={addon.value}
                  value={addon.value}
                  className={clsx(
                    "bg-surface-tertiary group relative flex-col gap-4 rounded-3xl px-5 py-4 transition-all",
                    "data-[selected=true]:bg-accent/10",
                  )}
                >
                  <Checkbox.Control className="absolute right-4 top-3 size-5 rounded-full before:rounded-full">
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content className="flex flex-row items-start justify-start gap-4">
                    <Icon className="text-accent size-5" icon={addon.icon} />
                    <div className="flex flex-col gap-1">
                      <Label>{addon.title}</Label>
                      <Description>{addon.description}</Description>
                    </div>
                  </Checkbox.Content>
                </Checkbox.Root>
              ))}
            </div>
          </CheckboxGroup>
        </section>
      </div>
    );
  },
};
