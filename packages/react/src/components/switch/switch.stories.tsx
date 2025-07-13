import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Switch, SwitchGroup} from "./switch";

const meta: Meta<typeof Switch.Root> = {
  title: "Components/Switch",
  component: Switch.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Switch.Root>;

export const Default: Story = {
  render: () => (
    <Switch.Root>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Switch.Root isDisabled>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch.Root>
  ),
};

export const DefaultSelected: Story = {
  render: () => (
    <Switch.Root defaultSelected>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Switch.Root isSelected={isSelected} onChange={setIsSelected}>
          <Switch.Control />
          <Switch.Label>Enable notifications</Switch.Label>
        </Switch.Root>
        <p className="text-muted-foreground text-sm">Switch is {isSelected ? "on" : "off"}</p>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => (
    <Switch.Root aria-label="Enable notifications">
      <Switch.Control />
    </Switch.Root>
  ),
};

export const LabelBefore: Story = {
  render: () => (
    <Switch.Root>
      <Switch.Label>Enable notifications</Switch.Label>
      <Switch.Control />
    </Switch.Root>
  ),
};

export const Group: Story = {
  render: () => (
    <SwitchGroup.Root>
      <SwitchGroup.Items>
        <Switch.Root name="notifications">
          <Switch.Control />
          <Switch.Label>Allow Notifications</Switch.Label>
        </Switch.Root>
        <Switch.Root name="marketing">
          <Switch.Control />
          <Switch.Label>Marketing emails</Switch.Label>
        </Switch.Root>
        <Switch.Root name="social">
          <Switch.Control />
          <Switch.Label>Social media updates</Switch.Label>
        </Switch.Root>
      </SwitchGroup.Items>
    </SwitchGroup.Root>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <SwitchGroup.Root orientation="horizontal">
      <SwitchGroup.Items>
        <Switch.Root name="notifications">
          <Switch.Control />
          <Switch.Label>Notifications</Switch.Label>
        </Switch.Root>
        <Switch.Root name="marketing">
          <Switch.Control />
          <Switch.Label>Marketing</Switch.Label>
        </Switch.Root>
        <Switch.Root name="social">
          <Switch.Control />
          <Switch.Label>Social</Switch.Label>
        </Switch.Root>
      </SwitchGroup.Items>
    </SwitchGroup.Root>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="max-w-sm">
      <Switch.Root>
        <div className="flex gap-3">
          <Switch.Control />
          <div className="flex flex-col gap-1">
            <Switch.Label>Public profile</Switch.Label>
            <p className="text-muted-foreground text-sm">
              Allow others to see your profile information
            </p>
          </div>
        </div>
      </Switch.Root>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Switch.Root>
      <Switch.Control className="h-7 w-12 data-[selected=true]:bg-green-500" />
      <Switch.Label className="text-lg font-medium">Custom styled switch</Switch.Label>
    </Switch.Root>
  ),
};

export const RenderProps: Story = {
  render: () => (
    <Switch.Root>
      {({isSelected}) => (
        <>
          <Switch.Control />
          <Switch.Label>{isSelected ? "Enabled" : "Disabled"}</Switch.Label>
        </>
      )}
    </Switch.Root>
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
        <SwitchGroup.Root>
          <SwitchGroup.Items>
            <Switch.Root name="notifications" value="on">
              <Switch.Control />
              <Switch.Label>Enable notifications</Switch.Label>
            </Switch.Root>
            <Switch.Root defaultSelected name="newsletter" value="on">
              <Switch.Control />
              <Switch.Label>Subscribe to newsletter</Switch.Label>
            </Switch.Root>
            <Switch.Root name="marketing" value="on">
              <Switch.Control />
              <Switch.Label>Receive marketing updates</Switch.Label>
            </Switch.Root>
          </SwitchGroup.Items>
        </SwitchGroup.Root>
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
