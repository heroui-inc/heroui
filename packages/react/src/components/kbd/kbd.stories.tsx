import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Kbd} from "./";

const meta: Meta<typeof Kbd> = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Kbd>
      <Kbd.Content>K</Kbd.Content>
    </Kbd>
  ),
};

export const WithSingleKey: Story = {
  render: () => (
    <Kbd>
      <Kbd.Abbr keyValue="command" />
      <Kbd.Content>K</Kbd.Content>
    </Kbd>
  ),
};

export const WithMultipleKeys: Story = {
  render: () => (
    <Kbd>
      <Kbd.Abbr keyValue="command" />
      <Kbd.Abbr keyValue="shift" />
      <Kbd.Content>K</Kbd.Content>
    </Kbd>
  ),
};

export const KeyCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Copy:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>C</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Paste:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>V</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Cut:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>X</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Undo:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Redo:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd>
      </div>
    </div>
  ),
};

export const NavigationKeys: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd>
        <Kbd.Abbr keyValue="up" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="down" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="left" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="right" />
      </Kbd>
    </div>
  ),
};

export const SpecialKeys: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Kbd>
        <Kbd.Abbr keyValue="enter" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="delete" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="escape" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="tab" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="capslock" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="space" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="pageup" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="pagedown" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="home" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="end" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="help" />
      </Kbd>
      <Kbd>
        <Kbd.Abbr keyValue="fn" />
      </Kbd>
    </div>
  ),
};

export const ComplexShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Open Spotlight:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="space" />
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Force Quit:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="option" />
          <Kbd.Abbr keyValue="escape" />
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Screenshot:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>3</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Switch Apps:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="tab" />
        </Kbd>
      </div>
    </div>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm">
        Press{" "}
        <Kbd>
          <Kbd.Content>Esc</Kbd.Content>
        </Kbd>{" "}
        to close the dialog.
      </p>
      <p className="text-sm">
        Use{" "}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>{" "}
        to open the command palette.
      </p>
      <p className="text-sm">
        Navigate with{" "}
        <Kbd>
          <Kbd.Abbr keyValue="up" />
        </Kbd>{" "}
        and{" "}
        <Kbd>
          <Kbd.Abbr keyValue="down" />
        </Kbd>{" "}
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
        <Kbd>
          <Kbd.Abbr keyValue="option" />
          <Kbd.Abbr keyValue="left" />
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Delete line:</span>
        <Kbd>
          <Kbd.Abbr keyValue="ctrl" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Multiple modifiers:</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="option" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>4</Kbd.Content>
        </Kbd>
      </div>
    </div>
  ),
};
