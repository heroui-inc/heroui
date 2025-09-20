import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Switch, SwitchGroup} from "./switch";

export default {
  argTypes: {},
  component: Switch,
  title: "Components/Switch",
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <Switch>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Switch isDisabled>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  ),
};

export const DefaultSelected: Story = {
  render: () => (
    <Switch defaultSelected>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Switch isSelected={isSelected} onChange={setIsSelected}>
          <Switch.Control />
          <Switch.Label>Enable notifications</Switch.Label>
        </Switch>
        <p className="text-muted text-sm">Switch is {isSelected ? "on" : "off"}</p>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => (
    <Switch aria-label="Enable notifications">
      <Switch.Control />
    </Switch>
  ),
};

export const LabelBefore: Story = {
  render: () => (
    <Switch>
      <Switch.Label>Enable notifications</Switch.Label>
      <Switch.Control />
    </Switch>
  ),
};

export const Group: Story = {
  render: () => (
    <SwitchGroup>
      <SwitchGroup.Items>
        <Switch name="notifications">
          <Switch.Control />
          <Switch.Label>Allow Notifications</Switch.Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control />
          <Switch.Label>Marketing emails</Switch.Label>
        </Switch>
        <Switch name="social">
          <Switch.Control />
          <Switch.Label>Social media updates</Switch.Label>
        </Switch>
      </SwitchGroup.Items>
    </SwitchGroup>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <SwitchGroup orientation="horizontal">
      <SwitchGroup.Items>
        <Switch name="notifications">
          <Switch.Control />
          <Switch.Label>Notifications</Switch.Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control />
          <Switch.Label>Marketing</Switch.Label>
        </Switch>
        <Switch name="social">
          <Switch.Control />
          <Switch.Label>Social</Switch.Label>
        </Switch>
      </SwitchGroup.Items>
    </SwitchGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="max-w-sm">
      <Switch>
        <div className="flex gap-3">
          <Switch.Control />
          <div className="flex flex-col gap-1">
            <Switch.Label>Public profile</Switch.Label>
            <p className="text-muted text-sm">Allow others to see your profile information</p>
          </div>
        </div>
      </Switch>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control
            className="h-6 w-12 bg-red-300 data-[selected=true]:bg-green-500"
            data-selected={isSelected}
          />
          <Switch.Label className="text-lg font-medium">Custom styled switch</Switch.Label>
        </>
      )}
    </Switch>
  ),
};

export const WithIcon: Story = {
  render: () => {
    const MoonIcon = () => {
      return (
        <svg
          aria-hidden="true"
          focusable="false"
          height="1em"
          role="presentation"
          viewBox="0 0 24 24"
          width="1em"
        >
          <path
            d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
            fill="currentColor"
          />
        </svg>
      );
    };

    const SunIcon = () => {
      return (
        <svg
          aria-hidden="true"
          focusable="false"
          height="1em"
          role="presentation"
          viewBox="0 0 24 24"
          width="1em"
        >
          <g fill="currentColor">
            <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
            <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
          </g>
        </svg>
      );
    };

    return (
      <div className="flex flex-col gap-6">
        <Switch>
          {({isSelected}) => (
            <>
              <Switch.Control>{isSelected ? <SunIcon /> : <MoonIcon />}</Switch.Control>
              <Switch.Label>{isSelected ? "Enabled" : "Disabled"}</Switch.Label>
            </>
          )}
        </Switch>
      </div>
    );
  },
};

export const RenderProps: Story = {
  render: () => (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control />
          <Switch.Label>{isSelected ? "Enabled" : "Disabled"}</Switch.Label>
        </>
      )}
    </Switch>
  ),
};

export const Form: Story = {
  render: function FormExample() {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);

      alert(
        `Form submitted with:\n${Array.from(formData.entries())
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")}`,
      );
    };

    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <SwitchGroup>
          <SwitchGroup.Items>
            <Switch name="notifications" value="on">
              <Switch.Control />
              <Switch.Label>Enable notifications</Switch.Label>
            </Switch>
            <Switch defaultSelected name="newsletter" value="on">
              <Switch.Control />
              <Switch.Label>Subscribe to newsletter</Switch.Label>
            </Switch>
            <Switch name="marketing" value="on">
              <Switch.Control />
              <Switch.Label>Receive marketing updates</Switch.Label>
            </Switch>
          </SwitchGroup.Items>
        </SwitchGroup>
        <button
          className="bg-accent text-accent-foreground hover:bg-accent-hover mt-4 rounded-md px-4 py-2 text-sm font-medium"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  },
};
