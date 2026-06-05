import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Description} from "../description";
import {FieldError} from "../field-error";
import {Label} from "../label";

import {Switch} from "./index";

export default {
  argTypes: {},
  component: Switch,
  parameters: {
    layout: "centered",
  },
  title: "Components/Controls/Switch",
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <Switch>
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Enable notifications</Label>
      </Switch.Button>
    </Switch>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Switch isDisabled>
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Enable notifications</Label>
      </Switch.Button>
    </Switch>
  ),
};

export const DefaultSelected: Story = {
  render: () => (
    <Switch defaultSelected>
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Enable notifications</Label>
      </Switch.Button>
    </Switch>
  ),
};

export const DisabledDefaultSelected: Story = {
  render: () => (
    <Switch defaultSelected isDisabled aria-label="Enable notifications">
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Switch isSelected={isSelected} onChange={setIsSelected}>
          <Switch.Button>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label className="text-sm">Enable notifications</Label>
          </Switch.Button>
        </Switch>
        <p className="text-sm text-muted">Switch is {isSelected ? "on" : "off"}</p>
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

export const Invalid: Story = {
  render: () => (
    <Switch isInvalid isRequired name="notifications">
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Enable notifications</Label>
      </Switch.Button>
      <FieldError>You must enable notifications to continue</FieldError>
    </Switch>
  ),
};

export const Validation: Story = {
  render: () => (
    <Switch
      isRequired
      name="terms-switch"
      validate={(isSelected) => (isSelected ? true : "You must accept to continue")}
    >
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Accept terms</Label>
      </Switch.Button>
      <FieldError />
    </Switch>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6">
      <Switch size="sm">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-xs">Small</Label>
        </Switch.Button>
      </Switch>
      <Switch size="md">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Medium</Label>
        </Switch.Button>
      </Switch>
      <Switch size="lg">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-base">Large</Label>
        </Switch.Button>
      </Switch>
    </div>
  ),
};

export const LabelBefore: Story = {
  render: () => (
    <Switch>
      <Switch.Button>
        <Label className="text-sm">Enable notifications</Label>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Button>
    </Switch>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="max-w-sm">
      <Switch>
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Public profile</Label>
        </Switch.Button>
        <Description>Allow others to see your profile information</Description>
      </Switch>
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <Switch aria-label="Power">
      {({isSelected}) => (
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
          <Switch key={key} defaultSelected aria-label={key} size="lg">
            {({isSelected}) => (
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
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">{isSelected ? "Enabled" : "Disabled"}</Label>
        </Switch.Button>
      )}
    </Switch>
  ),
};
