import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Button} from "../button";
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
      <Switch name="notifications">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Allow Notifications
        </Switch.Content>
      </Switch>
      <Switch name="marketing">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Marketing emails
        </Switch.Content>
      </Switch>
      <Switch name="social">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Social media updates
        </Switch.Content>
      </Switch>
    </SwitchGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <SwitchGroup className="overflow-x-auto" orientation="horizontal">
      <Switch name="notifications">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Notifications
        </Switch.Content>
      </Switch>
      <Switch name="marketing">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Marketing
        </Switch.Content>
      </Switch>
      <Switch name="social">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Social
        </Switch.Content>
      </Switch>
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
          <Switch name="notifications" value="on">
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              Enable notifications
            </Switch.Content>
          </Switch>
          <Switch defaultSelected name="newsletter" value="on">
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              Subscribe to newsletter
            </Switch.Content>
          </Switch>
          <Switch name="marketing" value="on">
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              Receive marketing updates
            </Switch.Content>
          </Switch>
        </SwitchGroup>
        <Button className="mt-4" size="sm" type="submit" variant="primary">
          Submit
        </Button>
      </form>
    );
  },
};
