import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Surface} from "../surface";

import {TextArea} from "./index";

export default {
  argTypes: {},
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  title: "Components/Forms/Textarea",
} as Meta<typeof TextArea>;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  render: () => <TextArea placeholder="Describe your product" />,
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-3">
      <TextArea fullWidth placeholder="Full width textarea" />
      <Surface className="w-full rounded-3xl p-6">
        <TextArea fullWidth inSurface="default" placeholder="Full width textarea on surface" />
      </Surface>
    </div>
  ),
};

export const SurfaceVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Default Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <TextArea className="w-full" placeholder="Describe your product" />
          <p className="text-sm text-muted">
            TextArea automatically detects default surface level.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <TextArea className="w-full" placeholder="Describe your product" />
          <p className="text-sm text-muted">
            TextArea automatically detects secondary surface level.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Tertiary Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
          <TextArea className="w-full" placeholder="Describe your product" />
          <p className="text-sm text-muted">
            TextArea automatically detects tertiary surface level.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Transparent Surface</p>
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
          variant="transparent"
        >
          <TextArea className="w-full" placeholder="Describe your product" />
          <p className="text-sm text-muted">
            TextArea automatically detects default surface level.
          </p>
        </Surface>
      </div>
    </div>
  ),
};
