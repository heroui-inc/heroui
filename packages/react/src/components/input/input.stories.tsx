import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Surface} from "../surface";

import {Input} from "./index";

export default {
  argTypes: {},
  component: Input,
  parameters: {
    layout: "centered",
  },
  title: "Components/Forms/Input",
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <Input placeholder="Your name" />,
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-[240px] flex-col gap-2">
      <Input fullWidth placeholder="Primary input" variant="primary" />
      <Input fullWidth placeholder="Secondary input" variant="secondary" />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-3">
      <Input fullWidth placeholder="Full width input" />
      <div className="flex h-[180px] items-center justify-center rounded-3xl bg-surface p-4">
        <Surface className="w-full">
          <Input fullWidth placeholder="Full width input on surface" variant="secondary" />
        </Surface>
      </div>
    </div>
  ),
};

export const OnSurfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Default Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <Input className="w-full" placeholder="Your name" variant="primary" />
          <Input className="w-full" placeholder="Your name" variant="secondary" />
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <Input className="w-full" placeholder="Your name" variant="primary" />
          <Input className="w-full" placeholder="Your name" variant="secondary" />
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Tertiary Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
          <Input className="w-full" placeholder="Your name" variant="primary" />
          <Input className="w-full" placeholder="Your name" variant="secondary" />
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Transparent Surface</p>
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
          variant="transparent"
        >
          <Input className="w-full" placeholder="Your name" variant="primary" />
          <Input className="w-full" placeholder="Your name" variant="secondary" />
        </Surface>
      </div>
    </div>
  ),
};
