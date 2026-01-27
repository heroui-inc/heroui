import type {ColorSwatchProps} from "./index";
import type {Meta} from "@storybook/react";

import React from "react";

import {ColorSwatch} from "./index";

export default {
  argTypes: {
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: "color",
    },
  },
  component: ColorSwatch,
  parameters: {
    layout: "centered",
  },
  title: "Components/Colors/ColorSwatch",
} as Meta<typeof ColorSwatch>;

const defaultArgs: ColorSwatchProps = {
  color: "#0485F7",
};

const Template = (props: ColorSwatchProps) => (
  <div className="flex items-center gap-3">
    <ColorSwatch className="h-5 w-5" {...props} />
  </div>
);

const ShapesTemplate = (props: ColorSwatchProps) => (
  <div className="flex items-center gap-3">
    <ColorSwatch {...props} shape="circle" />
    <ColorSwatch {...props} shape="square" />
  </div>
);

const ColorsTemplate = (_props: ColorSwatchProps) => (
  <div className="flex items-center gap-3">
    <ColorSwatch aria-label="Blue" color="#0485F7" />
    <ColorSwatch aria-label="Red" color="#EF4444" />
    <ColorSwatch aria-label="Amber" color="#F59E0B" />
    <ColorSwatch aria-label="Green" color="#10B981" />
    <ColorSwatch aria-label="Fuchsia" color="#D946EF" />
  </div>
);

const SizesTemplate = (props: ColorSwatchProps) => (
  <div className="flex items-center gap-3">
    <ColorSwatch {...props} color="#0485F7" size="xs" />
    <ColorSwatch {...props} color="#EF4444" size="sm" />
    <ColorSwatch {...props} color="#F59E0B" size="md" />
    <ColorSwatch {...props} color="#10B981" size="lg" />
    <ColorSwatch {...props} color="#D946EF" size="xl" />
  </div>
);

const TransparencyTemplate = (_props: ColorSwatchProps) => (
  <div className="flex items-center gap-3">
    <ColorSwatch aria-label="100% opacity" color="rgba(4, 133, 247, 1)" />
    <ColorSwatch aria-label="75% opacity" color="rgba(4, 133, 247, 0.75)" />
    <ColorSwatch aria-label="50% opacity" color="rgba(4, 133, 247, 0.5)" />
    <ColorSwatch aria-label="25% opacity" color="rgba(4, 133, 247, 0.25)" />
    <ColorSwatch aria-label="0% opacity" color="rgba(4, 133, 247, 0)" />
  </div>
);

const WithColorNameTemplate = (_props: ColorSwatchProps) => (
  <div className="flex items-center gap-3">
    <ColorSwatch aria-label="Primary color" color="#0485F7" colorName="Primary blue" />
    <ColorSwatch aria-label="Danger color" color="#EF4444" colorName="Danger red" />
    <ColorSwatch aria-label="Warning color" color="#F59E0B" colorName="Warning amber" />
    <ColorSwatch aria-label="Success color" color="#10B981" colorName="Success green" />
    <ColorSwatch aria-label="Accent color" color="#D946EF" colorName="Accent fuchsia" />
  </div>
);

const StyleRenderPropsTemplate = (_props: ColorSwatchProps) => {
  const colors = ["#0485F7", "#EF4444", "#F59E0B", "#10B981", "#D946EF"];

  return (
    <div className="flex flex-col gap-6">
      {/* Custom border using render props */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted">Custom Border</h3>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              size="lg"
              style={({color: c}) => ({
                boxShadow: `0 0 0 3px ${c.toString("css")}40`,
              })}
            />
          ))}
        </div>
      </div>

      {/* Custom shadow using render props */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted">Custom Shadow</h3>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              size="lg"
              style={({color: c}) => ({
                boxShadow: `0 4px 14px ${c.toString("css")}80`,
              })}
            />
          ))}
        </div>
      </div>

      {/* Outline style using render props */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted">Outline Style</h3>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              size="lg"
              style={({color: c}) => ({
                boxShadow: `inset 0 0 0 2px ${c.toString("css")}, inset 0 0 0 4px white`,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const AllVariantsTemplate = (_props: ColorSwatchProps) => {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const shapes = ["circle", "square"] as const;
  const colors = ["#0485F7", "#EF4444", "#F59E0B", "#10B981", "#D946EF"];

  return (
    <div className="flex flex-col gap-6">
      {shapes.map((shape) => (
        <div key={shape} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-muted capitalize">{shape}</h3>
          <div className="flex flex-col gap-3">
            {sizes.map((size) => (
              <div key={size} className="flex items-center gap-3">
                <div className="w-12 text-sm text-muted">{size}</div>
                {colors.map((color) => (
                  <ColorSwatch key={color} color={color} shape={shape} size={size} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const Sizes = {
  args: defaultArgs,
  render: SizesTemplate,
};

export const Shapes = {
  args: defaultArgs,
  render: ShapesTemplate,
};

export const Colors = {
  args: defaultArgs,
  render: ColorsTemplate,
};

export const Transparency = {
  args: defaultArgs,
  render: TransparencyTemplate,
};

export const WithColorName = {
  args: defaultArgs,
  render: WithColorNameTemplate,
};

export const StyleRenderProps = {
  args: defaultArgs,
  render: StyleRenderPropsTemplate,
};

export const AllVariants = {
  args: defaultArgs,
  render: AllVariantsTemplate,
};
