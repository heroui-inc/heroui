import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Input} from "../input";
import {Label} from "../label";
import {TextField} from "../text-field";

import {Surface} from "./index";

const meta: Meta<typeof Surface> = {
  argTypes: {},
  component: Surface,
  parameters: {
    layout: "centered",
  },
  title: "Components/Layout/Surface",
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Transparent</p>
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
          variant="transparent"
        >
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input className="w-[280px]" placeholder="john@example.com" />
          </TextField>
          <p className="text-sm text-muted">
            This is a default surface variant. It uses bg-surface styling.
          </p>
        </Surface>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Default</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          {/* TODO: TextField is not propagating the `variant` prop down to the Input */}
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input
              className="w-[280px] border border-border/20"
              placeholder="john@example.com"
              variant="secondary"
            />
          </TextField>
          <p className="text-sm text-muted">
            This is a default surface variant. It uses bg-surface styling.
          </p>
        </Surface>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input className="w-[280px]" placeholder="john@example.com" />
          </TextField>
          <p className="text-sm text-muted">
            This is a secondary surface variant. It uses bg-surface-secondary styling.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Tertiary</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
          <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input className="w-[280px]" placeholder="john@example.com" />
          </TextField>
          <p className="text-sm text-muted">
            This is a tertiary surface variant. It uses bg-surface-tertiary styling.
          </p>
        </Surface>
      </div>
    </div>
  ),
};
