import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Kbd} from "./index";

const meta: Meta<typeof Kbd.Root> = {
  title: "Components/Typography/Kbd",
  component: Kbd.Root,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "light"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Kbd.Root>
      <Kbd.Abbr keyValue="command" />
      <Kbd.Content>K</Kbd.Content>
    </Kbd.Root>
  ),
};

export const WithSingleKey: Story = {
  render: () => (
    <Kbd.Root>
      <Kbd.Abbr keyValue="command" />
      <Kbd.Content>K</Kbd.Content>
    </Kbd.Root>
  ),
};

export const WithMultipleKeys: Story = {
  render: () => (
    <Kbd.Root>
      <Kbd.Abbr keyValue="command" />
      <Kbd.Abbr keyValue="shift" />
      <Kbd.Content>K</Kbd.Content>
    </Kbd.Root>
  ),
};

export const KeyCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Copy:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>C</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Paste:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>V</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Cut:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>X</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Undo:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Redo:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd.Root>
      </div>
    </div>
  ),
};

export const LightVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Copy:</span>
        <Kbd.Root variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>C</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Paste:</span>
        <Kbd.Root variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>V</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Cut:</span>
        <Kbd.Root variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>X</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Undo:</span>
        <Kbd.Root variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Redo:</span>
        <Kbd.Root variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd.Root>
      </div>
    </div>
  ),
};

export const NavigationKeys: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd.Root>
        <Kbd.Abbr keyValue="up" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="down" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="left" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="right" />
      </Kbd.Root>
    </div>
  ),
};

export const SpecialKeys: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Kbd.Root>
        <Kbd.Abbr keyValue="enter" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="delete" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="escape" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="tab" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="capslock" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="space" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="pageup" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="pagedown" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="home" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="end" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="help" />
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="fn" />
      </Kbd.Root>
    </div>
  ),
};

export const ComplexShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Open Spotlight:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="space" />
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Force Quit:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="option" />
          <Kbd.Abbr keyValue="escape" />
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Screenshot:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>3</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Switch Apps:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="tab" />
        </Kbd.Root>
      </div>
    </div>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm">
        Press{" "}
        <Kbd.Root>
          <Kbd.Content>Esc</Kbd.Content>
        </Kbd.Root>{" "}
        to close the dialog.
      </p>
      <p className="text-sm">
        Use{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd.Root>{" "}
        to open the command palette.
      </p>
      <p className="text-sm">
        Navigate with{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="up" />
        </Kbd.Root>{" "}
        and{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="down" />
        </Kbd.Root>{" "}
        arrow keys.
      </p>
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Select word:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="option" />
          <Kbd.Abbr keyValue="left" />
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Delete line:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="ctrl" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd.Root>
      </div>
      <div className="flex items-center gap-2">
        <span>Multiple modifiers:</span>
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="option" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>4</Kbd.Content>
        </Kbd.Root>
      </div>
    </div>
  ),
};
