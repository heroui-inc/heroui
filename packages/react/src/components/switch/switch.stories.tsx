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
            className="h-[31px] w-[51px] bg-blue-500 transition-all duration-300 data-[selected=true]:bg-cyan-500 data-[selected=true]:shadow-[0_0_12px_rgba(6,182,212,0.5)]"
            data-selected={isSelected}
          >
            <Switch.Thumb
              className="size-[27px] bg-white shadow-sm transition-all duration-300 data-[selected=true]:translate-x-5 data-[selected=true]:shadow-lg"
              data-selected={isSelected}
            >
              <Switch.Icon>
                <Icon
                  className={`size-4 transition-colors ${isSelected ? "text-cyan-600" : "text-blue-600"}`}
                  icon={isSelected ? "gravity-ui:check" : "gravity-ui:power"}
                />
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </>
      )}
    </Switch>
  ),
};

export const WithIcon: Story = {
  render: () => {
    return (
      <Switch>
        {({isSelected}) => (
          <>
            <Switch.Control
              className="h-8 w-14 bg-red-200 data-[selected=true]:bg-green-200"
              data-selected={isSelected}
            >
              <Switch.Thumb
                className="size-7 bg-white data-[selected=true]:translate-x-6"
                data-selected={isSelected}
              >
                <Switch.Icon>
                  <Icon
                    className={`size-4 transition-colors ${isSelected ? "text-green-700" : "text-red-700"}`}
                    icon={isSelected ? "gravity-ui:lock-open" : "gravity-ui:lock"}
                  />
                </Switch.Icon>
              </Switch.Thumb>
            </Switch.Control>
          </>
        )}
      </Switch>
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
