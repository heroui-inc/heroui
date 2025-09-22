import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button, Description, Label} from "@heroui/react";

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
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label>Enable notifications</Label>
    </Switch>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Switch isDisabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label>Enable notifications</Label>
    </Switch>
  ),
};

export const DefaultSelected: Story = {
  render: () => (
    <Switch defaultSelected>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label>Enable notifications</Label>
    </Switch>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Switch isSelected={isSelected} onChange={setIsSelected}>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Enable notifications</Label>
        </Switch>
        <p className="text-muted text-sm">Switch is {isSelected ? "on" : "off"}</p>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => (
    <Switch aria-label="Enable notifications">
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  ),
};

export const LabelBefore: Story = {
  render: () => (
    <Switch>
      <Label>Enable notifications</Label>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  ),
};

export const Group: Story = {
  render: () => (
    <SwitchGroup>
      <SwitchGroup.Items>
        <Switch name="notifications">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Allow Notifications</Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Marketing emails</Label>
        </Switch>
        <Switch name="social">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Social media updates</Label>
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
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Notifications</Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Marketing</Label>
        </Switch>
        <Switch name="social">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Social</Label>
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
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <div className="flex flex-col gap-1">
            <Label>Public profile</Label>
            <Description>Allow others to see your profile information</Description>
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
            className="h-6 w-9 bg-red-300 data-[selected=true]:bg-green-500"
            data-selected={isSelected}
          >
            <Switch.Thumb className="bg-neutral-50" />
          </Switch.Control>
          <Label className="text-lg font-medium">Custom styled switch</Label>
        </>
      )}
    </Switch>
  ),
};

export const WithIcon: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <Switch>
          {({isSelected}) => (
            <>
              <Switch.Control>
                <Switch.Thumb>
                  <Switch.Icon>
                    <Icon icon="gravity-ui:circle-dashed" />
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
              <Label>{isSelected ? "Enabled" : "Disabled"}</Label>
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
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>{isSelected ? "Enabled" : "Disabled"}</Label>
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
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Label>Enable notifications</Label>
            </Switch>
            <Switch defaultSelected name="newsletter" value="on">
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Label>Subscribe to newsletter</Label>
            </Switch>
            <Switch name="marketing" value="on">
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Label>Receive marketing updates</Label>
            </Switch>
          </SwitchGroup.Items>
        </SwitchGroup>
        <Button className="mt-4" size="sm" type="submit" variant="primary">
          Submit
        </Button>
      </form>
    );
  },
};
