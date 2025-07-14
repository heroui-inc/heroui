import type {Meta, StoryObj} from "@storybook/react";

import {ThemeSwitcher} from "./theme-switcher";

const meta = {
  title: "Components/ThemeSwitcher",
  component: ThemeSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultTheme: {
      control: {
        type: "select",
        options: [null, "light", "dark", "light-glass", "dark-glass"],
      },
    },
    showSystemOption: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showSystemOption: true,
  },
};

export const WithoutSystemOption: Story = {
  args: {
    showSystemOption: false,
  },
};

export const WithDefaultTheme: Story = {
  args: {
    defaultTheme: "dark-glass",
    showSystemOption: true,
  },
};

export const InGlassPanel: Story = {
  render: (args) => (
    <div className="glass-panel rounded-lg p-8">
      <h3 className="text-foreground mb-4 text-lg font-semibold">Choose Theme</h3>
      <ThemeSwitcher {...args} />
      <p className="text-muted-foreground mt-4 text-sm">
        The theme will be applied to the entire Storybook UI
      </p>
    </div>
  ),
  args: {
    showSystemOption: true,
  },
};
