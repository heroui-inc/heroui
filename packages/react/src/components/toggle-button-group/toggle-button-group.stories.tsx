import type {Key} from "../rac";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {ToggleButton} from "../toggle-button";

import {ToggleButtonGroup} from "./";

const meta: Meta<typeof ToggleButtonGroup> = {
  argTypes: {
    fullWidth: {
      control: "boolean",
    },
    isDetached: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    selectionMode: {
      control: "select",
      options: ["single", "multiple"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  component: ToggleButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Buttons/ToggleButtonGroup",
};

export default meta;

type Story = StoryObj<typeof ToggleButtonGroup>;

export const Default: Story = {
  render: () => (
    <ToggleButtonGroup selectionMode="multiple">
      <ToggleButton isIconOnly aria-label="Bold" id="bold">
        <Icon icon="gravity-ui:bold" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Italic" id="italic">
        <Icon icon="gravity-ui:italic" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Underline" id="underline">
        <Icon icon="gravity-ui:underline" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
        <Icon icon="gravity-ui:strikethrough" />
      </ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Small</p>
        <ToggleButtonGroup selectionMode="multiple" size="sm">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Icon icon="gravity-ui:strikethrough" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Medium (default)</p>
        <ToggleButtonGroup selectionMode="multiple" size="md">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Icon icon="gravity-ui:strikethrough" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Large</p>
        <ToggleButtonGroup selectionMode="multiple" size="lg">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Icon icon="gravity-ui:strikethrough" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Horizontal</p>
        <ToggleButtonGroup orientation="horizontal" selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Vertical</p>
        <ToggleButtonGroup orientation="vertical" selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  ),
};

export const AttachedVsDetached: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Attached (default)</p>
        <ToggleButtonGroup selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Icon icon="gravity-ui:strikethrough" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Detached</p>
        <ToggleButtonGroup isDetached selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Icon icon="gravity-ui:strikethrough" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-3">
      <ToggleButtonGroup fullWidth selectionMode="multiple">
        <ToggleButton isIconOnly aria-label="Bold" id="bold">
          <Icon icon="gravity-ui:bold" />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Italic" id="italic">
          <Icon icon="gravity-ui:italic" />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Underline" id="underline">
          <Icon icon="gravity-ui:underline" />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
          <Icon icon="gravity-ui:strikethrough" />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup fullWidth selectionMode="single">
        <ToggleButton id="left">
          <Icon icon="gravity-ui:text-align-left" />
          Left
        </ToggleButton>
        <ToggleButton id="center">
          <Icon icon="gravity-ui:text-align-center" />
          Center
        </ToggleButton>
        <ToggleButton id="right">
          <Icon icon="gravity-ui:text-align-right" />
          Right
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  ),
};

export const SelectionMode: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Single selection</p>
        <ToggleButtonGroup defaultSelectedKeys={["center"]} selectionMode="single">
          <ToggleButton id="left">
            <Icon icon="gravity-ui:text-align-left" />
            Left
          </ToggleButton>
          <ToggleButton id="center">
            <Icon icon="gravity-ui:text-align-center" />
            Center
          </ToggleButton>
          <ToggleButton id="right">
            <Icon icon="gravity-ui:text-align-right" />
            Right
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Multiple selection</p>
        <ToggleButtonGroup defaultSelectedKeys={["bold", "underline"]} selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Icon icon="gravity-ui:strikethrough" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [selectedKeys, setSelectedKeys] = useState(new Set<Key>(["bold"]));

    return (
      <div className="flex flex-col gap-4">
        <ToggleButtonGroup
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          onSelectionChange={setSelectedKeys}
        >
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Icon icon="gravity-ui:strikethrough" />
          </ToggleButton>
        </ToggleButtonGroup>
        <p className="text-sm text-muted">
          Selected:{" "}
          <span className="font-medium">
            {selectedKeys.size > 0 ? [...selectedKeys].join(", ") : "None"}
          </span>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">All buttons disabled</p>
        <ToggleButtonGroup isDisabled selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Individual button disabled</p>
        <ToggleButtonGroup selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Icon icon="gravity-ui:bold" />
          </ToggleButton>
          <ToggleButton isDisabled isIconOnly aria-label="Italic" id="italic">
            <Icon icon="gravity-ui:italic" />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Icon icon="gravity-ui:underline" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  ),
};

export const WithoutSeparator: Story = {
  render: () => (
    <ToggleButtonGroup hideSeparator selectionMode="multiple">
      <ToggleButton isIconOnly aria-label="Bold" id="bold">
        <Icon icon="gravity-ui:bold" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Italic" id="italic">
        <Icon icon="gravity-ui:italic" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Underline" id="underline">
        <Icon icon="gravity-ui:underline" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
        <Icon icon="gravity-ui:strikethrough" />
      </ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ToggleButtonGroup defaultSelectedKeys={["italic"]} selectionMode="multiple">
        <ToggleButton id="bold">
          <Icon icon="gravity-ui:bold" />
          Bold
        </ToggleButton>
        <ToggleButton id="italic">
          <Icon icon="gravity-ui:italic" />
          Italic
        </ToggleButton>
        <ToggleButton id="underline">
          <Icon icon="gravity-ui:underline" />
          Underline
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  ),
};

export const Examples: Story = {
  render: function ExamplesStory() {
    const [alignment, setAlignment] = useState(new Set<Key>(["left"]));
    const [formatting, setFormatting] = useState(new Set<Key>(["bold", "underline"]));

    return (
      <div className="flex flex-col items-start gap-8">
        {/* Text formatting toolbar */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted">Text formatting toolbar</p>
          <div className="flex gap-2">
            <ToggleButtonGroup
              selectedKeys={formatting}
              selectionMode="multiple"
              onSelectionChange={setFormatting}
            >
              <ToggleButton isIconOnly aria-label="Bold" id="bold">
                <Icon icon="gravity-ui:bold" />
              </ToggleButton>
              <ToggleButton isIconOnly aria-label="Italic" id="italic">
                <Icon icon="gravity-ui:italic" />
              </ToggleButton>
              <ToggleButton isIconOnly aria-label="Underline" id="underline">
                <Icon icon="gravity-ui:underline" />
              </ToggleButton>
              <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
                <Icon icon="gravity-ui:strikethrough" />
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              disallowEmptySelection
              selectedKeys={alignment}
              selectionMode="single"
              onSelectionChange={setAlignment}
            >
              <ToggleButton isIconOnly aria-label="Align left" id="left">
                <Icon icon="gravity-ui:text-align-left" />
              </ToggleButton>
              <ToggleButton isIconOnly aria-label="Align center" id="center">
                <Icon icon="gravity-ui:text-align-center" />
              </ToggleButton>
              <ToggleButton isIconOnly aria-label="Align right" id="right">
                <Icon icon="gravity-ui:text-align-right" />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        {/* View mode switcher */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted">View mode switcher</p>
          <ToggleButtonGroup
            disallowEmptySelection
            defaultSelectedKeys={["grid"]}
            selectionMode="single"
            size="sm"
          >
            <ToggleButton isIconOnly aria-label="Grid view" id="grid">
              <Icon icon="gravity-ui:layout-cells-large" />
            </ToggleButton>
            <ToggleButton isIconOnly aria-label="List view" id="list">
              <Icon icon="gravity-ui:list-ul" />
            </ToggleButton>
            <ToggleButton isIconOnly aria-label="Columns view" id="columns">
              <Icon icon="gravity-ui:layout-columns-3" />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Vertical toolbar */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted">Vertical toolbar</p>
          <ToggleButtonGroup orientation="vertical" selectionMode="multiple">
            <ToggleButton isIconOnly aria-label="Bold" id="bold">
              <Icon icon="gravity-ui:bold" />
            </ToggleButton>
            <ToggleButton isIconOnly aria-label="Italic" id="italic">
              <Icon icon="gravity-ui:italic" />
            </ToggleButton>
            <ToggleButton isIconOnly aria-label="Underline" id="underline">
              <Icon icon="gravity-ui:underline" />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  },
};
