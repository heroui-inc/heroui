import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Kbd, KbdAbbr, KbdContent} from "./index";

const meta: Meta<typeof Kbd> = {
  title: "Components/Typography/Kbd",
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
      <KbdContent>K</KbdContent>
    </Kbd>
  ),
};

export const WithSingleKey: Story = {
  render: () => (
    <Kbd>
      <KbdAbbr keyValue="command" />
      <KbdContent>K</KbdContent>
    </Kbd>
  ),
};

export const WithMultipleKeys: Story = {
  render: () => (
    <Kbd>
      <KbdAbbr keyValue="command" />
      <KbdAbbr keyValue="shift" />
      <KbdContent>K</KbdContent>
    </Kbd>
  ),
};

export const KeyCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Copy:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdContent>C</KbdContent>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Paste:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdContent>V</KbdContent>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Cut:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdContent>X</KbdContent>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Undo:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdContent>Z</KbdContent>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Redo:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdAbbr keyValue="shift" />
          <KbdContent>Z</KbdContent>
        </Kbd>
      </div>
    </div>
  ),
};

export const NavigationKeys: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd>
        <KbdAbbr keyValue="up" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="down" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="left" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="right" />
      </Kbd>
    </div>
  ),
};

export const SpecialKeys: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Kbd>
        <KbdAbbr keyValue="enter" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="delete" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="escape" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="tab" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="capslock" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="space" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="pageup" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="pagedown" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="home" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="end" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="help" />
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="fn" />
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
          <KbdAbbr keyValue="command" />
          <KbdAbbr keyValue="space" />
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Force Quit:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdAbbr keyValue="option" />
          <KbdAbbr keyValue="escape" />
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Screenshot:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdAbbr keyValue="shift" />
          <KbdContent>3</KbdContent>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Switch Apps:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdAbbr keyValue="tab" />
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
          <KbdContent>Esc</KbdContent>
        </Kbd>{" "}
        to close the dialog.
      </p>
      <p className="text-sm">
        Use{" "}
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdContent>K</KbdContent>
        </Kbd>{" "}
        to open the command palette.
      </p>
      <p className="text-sm">
        Navigate with{" "}
        <Kbd>
          <KbdAbbr keyValue="up" />
        </Kbd>{" "}
        and{" "}
        <Kbd>
          <KbdAbbr keyValue="down" />
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
          <KbdAbbr keyValue="option" />
          <KbdAbbr keyValue="left" />
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Delete line:</span>
        <Kbd>
          <KbdAbbr keyValue="ctrl" />
          <KbdContent>K</KbdContent>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Multiple modifiers:</span>
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdAbbr keyValue="option" />
          <KbdAbbr keyValue="shift" />
          <KbdContent>4</KbdContent>
        </Kbd>
      </div>
    </div>
  ),
};
