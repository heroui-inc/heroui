import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Description} from "../description";
import {Label} from "../label";

import {Switch} from "./index";

export default {
  argTypes: {},
  component: Switch.Root,
  title: "Components/Controls/Switch",
} as Meta<typeof Switch.Root>;

type Story = StoryObj<typeof Switch.Root>;

export const Default: Story = {
  render: () => (
    <Switch.Root>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label className="text-sm">Enable notifications</Label>
    </Switch.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Switch.Root isDisabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label className="text-sm">Enable notifications</Label>
    </Switch.Root>
  ),
};

export const DefaultSelected: Story = {
  render: () => (
    <Switch.Root defaultSelected>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label className="text-sm">Enable notifications</Label>
    </Switch.Root>
  ),
};

export const DisabledDefaultSelected: Story = {
  render: () => (
    <Switch.Root defaultSelected isDisabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Switch.Root isSelected={isSelected} onChange={setIsSelected}>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Enable notifications</Label>
        </Switch.Root>
        <p className="text-muted text-sm">Switch is {isSelected ? "on" : "off"}</p>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => (
    <Switch.Root aria-label="Enable notifications">
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6">
      <Switch.Root size="sm">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-xs">Small</Label>
      </Switch.Root>
      <Switch.Root size="md">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Medium</Label>
      </Switch.Root>
      <Switch.Root size="lg">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-base">Large</Label>
      </Switch.Root>
    </div>
  ),
};

export const LabelBefore: Story = {
  render: () => (
    <Switch.Root>
      <Label className="text-sm">Enable notifications</Label>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch.Root>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="max-w-sm">
      <Switch.Root>
        <div className="flex gap-3">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <div className="-mt-0.5 flex flex-col gap-1">
            <Label className="text-sm">Public profile</Label>
            <Description>Allow others to see your profile information</Description>
          </div>
        </div>
      </Switch.Root>
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <Switch.Root>
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
    </Switch.Root>
  ),
};

export const WithIcons: Story = {
  render: () => {
    const icons = {
      lock: {
        off: "gravity-ui:volume-fill",
        on: "gravity-ui:volume-slash-fill",
        selectedControlClass: "bg-blue-500",
        selectedIconClass: "text-blue-600",
      },
      microphone: {
        off: "gravity-ui:microphone",
        on: "gravity-ui:microphone-slash",
        selectedControlClass: "bg-red-500",
        selectedIconClass: "text-red-600",
      },
      check: {
        off: "gravity-ui:power",
        on: "gravity-ui:check",
        selectedControlClass: "bg-green-500",
        selectedIconClass: "text-green-600",
      },
      darkMode: {
        off: "gravity-ui:moon",
        on: "gravity-ui:sun",
        selectedControlClass: "",
        selectedIconClass: "",
      },
      notification: {
        off: "gravity-ui:bell-slash",
        on: "gravity-ui:bell-fill",
        selectedControlClass: "bg-purple-500",
        selectedIconClass: "text-purple-600",
      },
    };

    return (
      <div className="flex gap-3">
        {Object.entries(icons).map(([key, value]) => (
          <Switch.Root key={key} defaultSelected size="lg">
            {({isSelected}) => (
              <>
                <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                  <Switch.Thumb>
                    <Switch.Icon>
                      <Icon
                        className={`${isSelected ? `opacity-100 ${value.selectedIconClass}` : "opacity-70"} size-3 text-inherit`}
                        icon={isSelected ? value.on : value.off}
                      />
                    </Switch.Icon>
                  </Switch.Thumb>
                </Switch.Control>
              </>
            )}
          </Switch.Root>
        ))}
      </div>
    );
  },
};

export const RenderProps: Story = {
  render: () => (
    <Switch.Root>
      {({isSelected}) => (
        <>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">{isSelected ? "Enabled" : "Disabled"}</Label>
        </>
      )}
    </Switch.Root>
  ),
};
