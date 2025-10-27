import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Button} from "../button";
import {Label} from "../label";
import {Switch} from "../switch";

import {SwitchGroup} from "./index";

export default {
  argTypes: {},
  component: SwitchGroup,
  parameters: {
    layout: "centered",
  },
  title: "Components/Controls/SwitchGroup",
} as Meta<typeof SwitchGroup>;

type Story = StoryObj<typeof SwitchGroup>;

export const Default: Story = {
  render: () => (
    <SwitchGroup>
      <Switch.Root name="notifications">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Allow Notifications</Label>
      </Switch.Root>
      <Switch.Root name="marketing">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Marketing emails</Label>
      </Switch.Root>
      <Switch.Root name="social">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Social media updates</Label>
      </Switch.Root>
    </SwitchGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <SwitchGroup className="overflow-x-auto" orientation="horizontal">
      <Switch.Root name="notifications">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Notifications</Label>
      </Switch.Root>
      <Switch.Root name="marketing">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Marketing</Label>
      </Switch.Root>
      <Switch.Root name="social">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Social</Label>
      </Switch.Root>
    </SwitchGroup>
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
          <Switch.Root name="notifications" value="on">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label className="text-sm">Enable notifications</Label>
          </Switch.Root>
          <Switch.Root defaultSelected name="newsletter" value="on">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label className="text-sm">Subscribe to newsletter</Label>
          </Switch.Root>
          <Switch.Root name="marketing" value="on">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label className="text-sm">Receive marketing updates</Label>
          </Switch.Root>
        </SwitchGroup>
        <Button className="mt-4" size="sm" type="submit" variant="primary">
          Submit
        </Button>
      </form>
    );
  },
};
