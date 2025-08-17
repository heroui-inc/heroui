import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Switch, SwitchGroup} from "./switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "📝 ToDo/Switch",
};

export default meta;
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
      <Switch.Control className="h-7 w-12 data-[selected=true]:bg-green-500" />
      <Switch.Label className="text-lg font-medium">Custom styled switch</Switch.Label>
    </Switch>
  ),
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
