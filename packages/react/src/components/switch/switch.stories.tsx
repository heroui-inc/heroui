import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {Label} from "../label";

import {Switch, SwitchGroup} from "./switch";

export default {
  argTypes: {},
  component: Switch,
  title: "Components/Controls/Switch",
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <Switch>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label className="text-sm">Enable notifications</Label>
    </Switch>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Switch isDisabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label className="text-sm">Enable notifications</Label>
    </Switch>
  ),
};

export const DefaultSelected: Story = {
  render: () => (
    <Switch defaultSelected>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label className="text-sm">Enable notifications</Label>
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
          <Label className="text-sm">Enable notifications</Label>
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

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6">
      <Switch size="sm">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-xs">Small</Label>
      </Switch>
      <Switch size="md">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Medium</Label>
      </Switch>
      <Switch size="lg">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-base">Large</Label>
      </Switch>
    </div>
  ),
};

export const LabelBefore: Story = {
  render: () => (
    <Switch>
      <Label className="text-sm">Enable notifications</Label>
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
          <Label className="text-sm">Allow Notifications</Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Marketing emails</Label>
        </Switch>
        <Switch name="social">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Social media updates</Label>
        </Switch>
      </SwitchGroup.Items>
    </SwitchGroup>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <SwitchGroup className="overflow-x-auto" orientation="horizontal">
      <SwitchGroup.Items>
        <Switch name="notifications">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Notifications</Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Marketing</Label>
        </Switch>
        <Switch name="social">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Social</Label>
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
          <div className="-mt-0.5 flex flex-col gap-1">
            <Label className="text-sm">Public profile</Label>
            <Description>Allow others to see your profile information</Description>
          </div>
        </div>
      </Switch>
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control
            className={`h-[31px] w-[51px] bg-blue-500 ${isSelected ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
          >
            <Switch.Thumb
              className={`size-[27px] bg-white shadow-sm ${isSelected ? "ms-[22px] shadow-lg" : ""}`}
            >
              <Switch.Icon>
                <Icon
                  className={`size-4 ${isSelected ? "text-cyan-600" : "text-blue-600"}`}
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

export const WithIcons: Story = {
  render: () => {
    const icons = {
      lock: {
        off: "gravity-ui:volume-fill",
        on: "gravity-ui:volume-slash-fill",
        selectedControlClass: "bg-blue-500",
      },
      microphone: {
        off: "gravity-ui:microphone",
        on: "gravity-ui:microphone-slash",
        selectedControlClass: "bg-red-500",
      },
      check: {
        off: "gravity-ui:power",
        on: "gravity-ui:check",
        selectedControlClass: "bg-green-500",
      },
      darkMode: {
        off: "gravity-ui:moon",
        on: "gravity-ui:sun",
        selectedControlClass: "",
      },
      notification: {
        off: "gravity-ui:bell-slash",
        on: "gravity-ui:bell-fill",
        selectedControlClass: "bg-purple-500",
      },
    };

    return (
      <div className="flex gap-3">
        {Object.entries(icons).map(([key, value]) => (
          <Switch key={key} defaultSelected size="lg">
            {({isSelected}) => (
              <>
                <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                  <Switch.Thumb>
                    <Switch.Icon>
                      <Icon
                        className={`${isSelected ? "opacity-100" : "opacity-70"} size-3 text-inherit`}
                        icon={isSelected ? value.on : value.off}
                      />
                    </Switch.Icon>
                  </Switch.Thumb>
                </Switch.Control>
              </>
            )}
          </Switch>
        ))}
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
          <Label className="text-sm">{isSelected ? "Enabled" : "Disabled"}</Label>
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
              <Label className="text-sm">Enable notifications</Label>
            </Switch>
            <Switch defaultSelected name="newsletter" value="on">
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Label className="text-sm">Subscribe to newsletter</Label>
            </Switch>
            <Switch name="marketing" value="on">
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Label className="text-sm">Receive marketing updates</Label>
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
