import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {parseColor} from "../rac";

import {ColorSwatchPicker} from "./index";

export default {
  argTypes: {
    layout: {
      control: "select",
      options: ["grid", "stack"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["circle", "square"],
    },
  },
  component: ColorSwatchPicker,
  parameters: {
    layout: "centered",
  },
  title: "Components/Colors/ColorSwatchPicker",
} as Meta<typeof ColorSwatchPicker>;

type Story = StoryObj<typeof ColorSwatchPicker>;

const defaultColors = ["#F43F5E", "#D946EF", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#84CC16"];

const Template = (props: ColorSwatchPicker["RootProps"]) => (
  <ColorSwatchPicker {...props}>
    {defaultColors.map((color) => (
      <ColorSwatchPicker.Item key={color} color={color}>
        <ColorSwatchPicker.Swatch />
        <ColorSwatchPicker.Indicator />
      </ColorSwatchPicker.Item>
    ))}
  </ColorSwatchPicker>
);

export const Default: Story = {
  args: {
    variant: "circle",
    size: "md",
    layout: "grid",
  },
  render: Template,
};

const SizesTemplate = () => {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

  return (
    <div className="flex flex-col gap-8">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted capitalize">{size}</span>
          <ColorSwatchPicker size={size}>
            {defaultColors.map((color) => (
              <ColorSwatchPicker.Item key={color} color={color}>
                <ColorSwatchPicker.Swatch />
                <ColorSwatchPicker.Indicator />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
        </div>
      ))}
    </div>
  );
};

export const Sizes: Story = {
  render: SizesTemplate,
};

const VariantsTemplate = () => {
  const variants = ["circle", "square"] as const;

  return (
    <div className="flex flex-col gap-8">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted capitalize">{variant}</span>
          <ColorSwatchPicker variant={variant}>
            {defaultColors.map((color) => (
              <ColorSwatchPicker.Item key={color} color={color}>
                <ColorSwatchPicker.Swatch />
                <ColorSwatchPicker.Indicator />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
        </div>
      ))}
    </div>
  );
};

export const Variants: Story = {
  render: VariantsTemplate,
};

const LayoutsTemplate = () => {
  const layouts = ["grid", "stack"] as const;

  return (
    <div className="flex flex-col gap-8">
      {layouts.map((layout) => (
        <div key={layout} className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted capitalize">{layout}</span>
          <ColorSwatchPicker layout={layout}>
            {defaultColors.map((color) => (
              <ColorSwatchPicker.Item key={color} color={color}>
                <ColorSwatchPicker.Swatch />
                <ColorSwatchPicker.Indicator />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
        </div>
      ))}
    </div>
  );
};

export const Layouts: Story = {
  render: LayoutsTemplate,
};

const AllVariantsTemplate = () => {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const variants = ["circle", "square"] as const;

  return (
    <div className="flex gap-16">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-6">
          <span className="text-sm font-semibold text-muted capitalize">{variant}</span>
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="w-8 text-sm text-muted">{size}</span>
              <ColorSwatchPicker size={size} variant={variant}>
                {defaultColors.map((color) => (
                  <ColorSwatchPicker.Item key={color} color={color}>
                    <ColorSwatchPicker.Swatch />
                    <ColorSwatchPicker.Indicator />
                  </ColorSwatchPicker.Item>
                ))}
              </ColorSwatchPicker>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const AllVariants: Story = {
  render: AllVariantsTemplate,
};

export const Controlled: Story = {
  render: function ControlledComponent() {
    const [value, setValue] = React.useState(parseColor("#F43F5E"));

    return (
      <div className="flex flex-col gap-4">
        <ColorSwatchPicker value={value} onChange={setValue}>
          {defaultColors.map((color) => (
            <ColorSwatchPicker.Item key={color} color={color}>
              <ColorSwatchPicker.Swatch />
              <ColorSwatchPicker.Indicator />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>
        <p className="text-sm text-muted">
          Selected: <span className="font-medium">{value.toString("hex")}</span>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const colors = ["#F43F5E", "#D946EF", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#84CC16"];

    return (
      <ColorSwatchPicker>
        {colors.map((color) => (
          <ColorSwatchPicker.Item key={color} isDisabled color={color}>
            <ColorSwatchPicker.Swatch />
            <ColorSwatchPicker.Indicator />
          </ColorSwatchPicker.Item>
        ))}
      </ColorSwatchPicker>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <ColorSwatchPicker defaultValue="#8B5CF6">
      {defaultColors.map((color) => (
        <ColorSwatchPicker.Item key={color} color={color}>
          <ColorSwatchPicker.Swatch />
          <ColorSwatchPicker.Indicator />
        </ColorSwatchPicker.Item>
      ))}
    </ColorSwatchPicker>
  ),
};

const ExtendedPaletteTemplate = () => {
  const palette = [
    // Reds
    "#FEE2E2",
    "#FECACA",
    "#FCA5A5",
    "#F87171",
    "#EF4444",
    "#DC2626",
    // Oranges
    "#FFEDD5",
    "#FED7AA",
    "#FDBA74",
    "#FB923C",
    "#F97316",
    "#EA580C",
    // Yellows
    "#FEF3C7",
    "#FDE68A",
    "#FCD34D",
    "#FBBF24",
    "#F59E0B",
    "#D97706",
    // Greens
    "#DCFCE7",
    "#BBF7D0",
    "#86EFAC",
    "#4ADE80",
    "#22C55E",
    "#16A34A",
    // Blues
    "#DBEAFE",
    "#BFDBFE",
    "#93C5FD",
    "#60A5FA",
    "#3B82F6",
    "#2563EB",
    // Purples
    "#EDE9FE",
    "#DDD6FE",
    "#C4B5FD",
    "#A78BFA",
    "#8B5CF6",
    "#7C3AED",
    // White & Black
    "#FFFFFF",
    "#000000",
  ];

  return (
    <div className="max-w-md">
      <ColorSwatchPicker className="gap-1" size="sm">
        {palette.map((color) => (
          <ColorSwatchPicker.Item key={color} color={color}>
            <ColorSwatchPicker.Swatch />
            <ColorSwatchPicker.Indicator />
          </ColorSwatchPicker.Item>
        ))}
      </ColorSwatchPicker>
    </div>
  );
};

export const ExtendedPalette: Story = {
  render: ExtendedPaletteTemplate,
};
