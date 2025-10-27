import React from "react";
import type {Meta} from "@storybook/react";

const meta: Meta = {
  title: "Color System",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

interface ColorItemProps {
  name: string;
  variable: string;
  cssVariable?: string;
}

const ColorItem = ({name, variable, cssVariable}: ColorItemProps) => {
  const computedColor =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue(cssVariable || variable).trim()
      : "";

  return (
    <div className="flex items-center gap-4 rounded-lg border border-divider p-4">
      <div
        className="size-12 shrink-0 rounded-lg border border-divider"
        style={{backgroundColor: `var(${variable})`}}
      />
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <code className="text-xs text-muted">{variable}</code>
      </div>
      {computedColor && (
        <div className="text-right">
          <code className="text-xs font-mono text-muted">{computedColor}</code>
        </div>
      )}
    </div>
  );
};

interface ColorSectionProps {
  title: string;
  colors: ColorItemProps[];
}

const ColorSection = ({title, colors}: ColorSectionProps) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <div className="grid gap-3">
        {colors.map((color) => (
          <ColorItem key={color.variable} {...color} />
        ))}
      </div>
    </div>
  );
};

export const AllColors = () => {
  const baseColors: ColorItemProps[] = [
    {name: "Background", variable: "--color-background"},
    {name: "Foreground", variable: "--color-foreground"},
    {name: "Surface", variable: "--color-surface"},
    {name: "Surface Foreground", variable: "--color-surface-foreground"},
    {name: "Overlay", variable: "--color-overlay"},
    {name: "Overlay Foreground", variable: "--color-overlay-foreground"},
  ];

  const brandColors: ColorItemProps[] = [
    {name: "Accent", variable: "--color-accent"},
    {name: "Accent Foreground", variable: "--color-accent-foreground"},
    {name: "Accent Soft", variable: "--color-accent-soft"},
    {name: "Accent Soft Foreground", variable: "--color-accent-soft-foreground"},
  ];

  const semanticColors: ColorItemProps[] = [
    {name: "Default", variable: "--color-default"},
    {name: "Default Foreground", variable: "--color-default-foreground"},
    {name: "Success", variable: "--color-success"},
    {name: "Success Foreground", variable: "--color-success-foreground"},
    {name: "Warning", variable: "--color-warning"},
    {name: "Warning Foreground", variable: "--color-warning-foreground"},
    {name: "Danger", variable: "--color-danger"},
    {name: "Danger Foreground", variable: "--color-danger-foreground"},
  ];

  const componentColors: ColorItemProps[] = [
    {name: "Muted", variable: "--color-muted"},
    {name: "Border", variable: "--color-border"},
    {name: "Divider", variable: "--color-divider"},
    {name: "Focus", variable: "--color-focus"},
    {name: "Link", variable: "--color-link"},
    {name: "Segment", variable: "--color-segment"},
    {name: "Segment Foreground", variable: "--color-segment-foreground"},
  ];

  const formFieldColors: ColorItemProps[] = [
    {name: "Field Background", variable: "--color-field"},
    {name: "Field Foreground", variable: "--color-field-foreground"},
    {name: "Field Placeholder", variable: "--color-field-placeholder"},
    {name: "Field Border", variable: "--color-field-border"},
    {name: "Field Hover", variable: "--color-field-hover"},
    {name: "Field Focus", variable: "--color-field-focus"},
  ];

  const primitiveColors: ColorItemProps[] = [
    {name: "White", variable: "--white"},
    {name: "Black", variable: "--black"},
    {name: "Snow", variable: "--snow"},
    {name: "Eclipse", variable: "--eclipse"},
  ];

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Color System</h1>
        <p className="text-muted">
          HeroUI's color palette with CSS variables and computed values
        </p>
      </div>

      <ColorSection colors={baseColors} title="Base Colors" />
      <ColorSection colors={brandColors} title="Brand Colors" />
      <ColorSection colors={semanticColors} title="Semantic Colors" />
      <ColorSection colors={componentColors} title="Component Colors" />
      <ColorSection colors={formFieldColors} title="Form Field Colors" />
      <ColorSection colors={primitiveColors} title="Primitive Colors" />
    </div>
  );
};

AllColors.parameters = {
  docs: {
    description: {
      story:
        "A comprehensive overview of all color tokens available in the HeroUI design system. Each color shows its CSS variable name and computed value.",
    },
  },
};
