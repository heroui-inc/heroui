import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Alert} from "../components/alert";
import {Button} from "../components/button";
import {Chip} from "../components/chip";

const meta = {
  title: "Foundations/Theme Showcase",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ThemeShowcase = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-foreground mb-2 text-3xl font-bold">HeroUI Theme System</h1>
        <p className="text-muted-foreground">
          Switch themes using the paintbrush icon in the toolbar above
        </p>
      </div>

      {/* Color Palette */}
      <div className="bg-panel border-border rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <div className="bg-background border-border mb-2 h-20 rounded-md border" />
            <p className="text-sm">Background</p>
          </div>
          <div>
            <div className="bg-foreground mb-2 h-20 rounded-md" />
            <p className="text-sm">Foreground</p>
          </div>
          <div>
            <div className="bg-panel border-border mb-2 h-20 rounded-md border" />
            <p className="text-sm">Panel</p>
          </div>
          <div>
            <div className="bg-accent mb-2 h-20 rounded-md" />
            <p className="text-sm">Accent</p>
          </div>
          <div>
            <div className="bg-success mb-2 h-20 rounded-md" />
            <p className="text-sm">Success</p>
          </div>
          <div>
            <div className="bg-warning mb-2 h-20 rounded-md" />
            <p className="text-sm">Warning</p>
          </div>
          <div>
            <div className="bg-danger mb-2 h-20 rounded-md" />
            <p className="text-sm">Danger</p>
          </div>
          <div>
            <div className="bg-muted mb-2 h-20 rounded-md" />
            <p className="text-sm">Muted</p>
          </div>
        </div>
      </div>

      {/* Glass Effects */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="glass-soft bg-panel border-border/20 rounded-lg border p-6">
          <h3 className="mb-2 font-semibold">Soft Glass</h3>
          <p className="text-muted-foreground text-sm">5px blur effect</p>
        </div>
        <div className="glass bg-panel border-border/20 rounded-lg border p-6">
          <h3 className="mb-2 font-semibold">Standard Glass</h3>
          <p className="text-muted-foreground text-sm">10px blur effect</p>
        </div>
        <div className="glass-strong bg-panel border-border/20 rounded-lg border p-6">
          <h3 className="mb-2 font-semibold">Strong Glass</h3>
          <p className="text-muted-foreground text-sm">20px blur effect</p>
        </div>
      </div>

      {/* Components */}
      <div className="glass-panel rounded-lg p-6">
        <h2 className="mb-4 text-xl font-semibold">Component Examples</h2>

        <div className="space-y-4">
          {/* Buttons */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          {/* Chips */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Chips</h3>
            <div className="flex flex-wrap gap-2">
              <Chip variant="primary">Primary</Chip>
              <Chip variant="secondary">Secondary</Chip>
              <Chip variant="tertiary">Tertiary</Chip>
            </div>
          </div>

          {/* Alerts */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Alerts</h3>
            <div className="space-y-2">
              <Alert.Root>
                <Alert.Icon />
                <Alert.Content>
                  <Alert.Title>Default Alert</Alert.Title>
                  <Alert.Description>This is a default alert message</Alert.Description>
                </Alert.Content>
              </Alert.Root>

              <Alert.Root variant="success">
                <Alert.Icon />
                <Alert.Content>
                  <Alert.Title>Success!</Alert.Title>
                  <Alert.Description>Operation completed successfully</Alert.Description>
                </Alert.Content>
              </Alert.Root>
            </div>
          </div>
        </div>
      </div>

      {/* Surface Levels */}
      <div className="bg-panel border-border rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Surface Levels</h2>
        <div className="space-y-3">
          <div className="bg-surface-1 border-border rounded-md border p-4">
            <p className="text-surface-foreground">Surface Level 1</p>
          </div>
          <div className="bg-surface-2 border-border rounded-md border p-4">
            <p className="text-surface-foreground">Surface Level 2</p>
          </div>
          <div className="bg-surface-3 border-border rounded-md border p-4">
            <p className="text-surface-foreground">Surface Level 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Showcase: Story = {
  render: () => <ThemeShowcase />,
};

export const GlassPanel: Story = {
  render: () => (
    <div className="p-8">
      <div className="glass-panel mx-auto max-w-md rounded-lg p-6">
        <h2 className="mb-4 text-xl font-semibold">Glass Panel Example</h2>
        <p className="text-muted-foreground mb-4">
          This panel demonstrates the glass effect. Try switching between different themes to see
          how it adapts.
        </p>
        <div className="flex gap-2">
          <Button>Action</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  ),
};
