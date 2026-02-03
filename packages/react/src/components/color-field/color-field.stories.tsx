import type {Meta, StoryObj} from "@storybook/react";
import type {Color} from "react-aria-components";

import React, {useState} from "react";

import {Button} from "../button";
import {ColorInputGroup} from "../color-input-group";
import {ColorSwatch} from "../color-swatch";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";
import {parseColor} from "../rac";

import {ColorField} from "./index";

const meta: Meta<typeof ColorField> = {
  component: ColorField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Colors/ColorField",
};

export default meta;
type Story = StoryObj<typeof meta>;

const DEFAULT_COLOR = parseColor("#0485F7");

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState<Color | null>(DEFAULT_COLOR);

    return (
      <ColorField className="w-[280px]" name="color" value={color} onChange={setColor}>
        <Label>Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Prefix>
            <ColorSwatch color={color ?? undefined} size="xs" />
          </ColorInputGroup.Prefix>
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ColorField className="w-[280px]" defaultValue={parseColor("#0485F7")} name="primary-color">
        <Label>Primary variant</Label>
        <ColorInputGroup variant="primary">
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
      <ColorField className="w-[280px]" defaultValue={parseColor("#F43F5E")} name="secondary-color">
        <Label>Secondary variant</Label>
        <ColorInputGroup variant="secondary">
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <ColorField fullWidth defaultValue={parseColor("#10B981")} name="color">
        <Label>Brand Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
      <ColorField fullWidth defaultValue={parseColor("#8B5CF6")} name="color-with-suffix">
        <Label>Theme Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ColorField className="w-[280px]" defaultValue={parseColor("#3B82F6")} name="color">
        <Label>Primary Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
        <Description>Enter your brand's primary color</Description>
      </ColorField>
      <ColorField className="w-[280px]" defaultValue={parseColor("#F59E0B")} name="accent-color">
        <Label>Accent Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
        <Description>Used for highlights and CTAs</Description>
      </ColorField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ColorField isRequired className="w-[280px]" name="color">
        <Label>Brand Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input placeholder="#000000" />
        </ColorInputGroup>
      </ColorField>
      <ColorField isRequired className="w-[280px]" name="theme-color">
        <Label>Theme Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input placeholder="#000000" />
        </ColorInputGroup>
        <Description>Required field</Description>
      </ColorField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ColorField isInvalid isRequired className="w-[280px]" name="color">
        <Label>Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input placeholder="#000000" />
        </ColorInputGroup>
        <FieldError>Please enter a valid hex color</FieldError>
      </ColorField>
      <ColorField isInvalid className="w-[280px]" name="invalid-color">
        <Label>Background Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input defaultValue="not-a-color" />
        </ColorInputGroup>
        <FieldError>Invalid color format. Use hex (e.g., #FF5733)</FieldError>
      </ColorField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ColorField
        isDisabled
        className="w-[280px]"
        defaultValue={parseColor("#0485F7")}
        name="color"
      >
        <Label>Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
        <Description>This color field is disabled</Description>
      </ColorField>
      <ColorField isDisabled className="w-[280px]" name="color-empty">
        <Label>Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input placeholder="#000000" />
        </ColorInputGroup>
        <Description>This color field is disabled</Description>
      </ColorField>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Color | null>(parseColor("#0485F7"));

    return (
      <div className="flex flex-col gap-4">
        <ColorField className="w-[280px]" name="color" value={value} onChange={setValue}>
          <Label>Color</Label>
          <ColorInputGroup>
            <ColorInputGroup.Prefix>
              <ColorSwatch color={value ?? undefined} size="xs" />
            </ColorInputGroup.Prefix>
            <ColorInputGroup.Input />
          </ColorInputGroup>
          <Description>Current value: {value ? value.toString("hex") : "(empty)"}</Description>
        </ColorField>
        <div className="flex gap-2">
          <Button variant="tertiary" onPress={() => setValue(parseColor("#EF4444"))}>
            Set Red
          </Button>
          <Button variant="tertiary" onPress={() => setValue(parseColor("#10B981"))}>
            Set Green
          </Button>
          <Button variant="tertiary" onPress={() => setValue(null)}>
            Clear
          </Button>
        </div>
      </div>
    );
  },
};

export const ChannelEditing: Story = {
  render: () => {
    const [color, setColor] = useState<Color | null>(parseColor("#7F007F"));

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted">Edit individual HSL channels:</p>
        <div className="flex gap-4">
          <ColorField
            channel="hue"
            className="w-[100px]"
            colorSpace="hsl"
            name="hue"
            value={color}
            onChange={setColor}
          >
            <Label>Hue</Label>
            <ColorInputGroup>
              <ColorInputGroup.Input />
            </ColorInputGroup>
          </ColorField>
          <ColorField
            channel="saturation"
            className="w-[100px]"
            colorSpace="hsl"
            name="saturation"
            value={color}
            onChange={setColor}
          >
            <Label>Saturation</Label>
            <ColorInputGroup>
              <ColorInputGroup.Input />
              <ColorInputGroup.Suffix>
                <span className="text-sm text-muted">%</span>
              </ColorInputGroup.Suffix>
            </ColorInputGroup>
          </ColorField>
          <ColorField
            channel="lightness"
            className="w-[100px]"
            colorSpace="hsl"
            name="lightness"
            value={color}
            onChange={setColor}
          >
            <Label>Lightness</Label>
            <ColorInputGroup>
              <ColorInputGroup.Input />
              <ColorInputGroup.Suffix>
                <span className="text-sm text-muted">%</span>
              </ColorInputGroup.Suffix>
            </ColorInputGroup>
          </ColorField>
        </div>
        <div className="flex items-center gap-2">
          <ColorSwatch className="size-8" color={color ?? undefined} size="xs" />
          <span className="text-sm">Current: {color ? color.toString("hex") : "(empty)"}</span>
        </div>
      </div>
    );
  },
};

export const RGBChannels: Story = {
  render: () => {
    const [color, setColor] = useState<Color | null>(parseColor("#3B82F6"));

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted">Edit individual RGB channels:</p>
        <div className="flex gap-4">
          <ColorField
            channel="red"
            className="w-[80px]"
            colorSpace="rgb"
            name="red"
            value={color}
            onChange={setColor}
          >
            <Label>Red</Label>
            <ColorInputGroup>
              <ColorInputGroup.Input />
            </ColorInputGroup>
          </ColorField>
          <ColorField
            channel="green"
            className="w-[80px]"
            colorSpace="rgb"
            name="green"
            value={color}
            onChange={setColor}
          >
            <Label>Green</Label>
            <ColorInputGroup>
              <ColorInputGroup.Input />
            </ColorInputGroup>
          </ColorField>
          <ColorField
            channel="blue"
            className="w-[80px]"
            colorSpace="rgb"
            name="blue"
            value={color}
            onChange={setColor}
          >
            <Label>Blue</Label>
            <ColorInputGroup>
              <ColorInputGroup.Input />
            </ColorInputGroup>
          </ColorField>
        </div>
        <div className="flex items-center gap-2">
          <ColorSwatch className="size-8" color={color ?? undefined} size="xs" />
          <span className="text-sm">Current: {color?.toString("hex")}</span>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState<Color | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isInvalid = value === null;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!value) {
        return;
      }

      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log("Color submitted:", {color: value.toString("hex")});
        setValue(null);
        setIsSubmitting(false);
      }, 1500);
    };

    return (
      <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
        <ColorField
          fullWidth
          isRequired
          className="w-full"
          isInvalid={Boolean(isInvalid && value !== null)}
          name="brand-color"
          value={value}
          onChange={setValue}
        >
          <Label>Brand Color</Label>
          <ColorInputGroup>
            <ColorInputGroup.Prefix>
              <ColorSwatch color={value ?? undefined} size="xs" />
            </ColorInputGroup.Prefix>
            <ColorInputGroup.Input placeholder="#000000" />
          </ColorInputGroup>
          <Description>Choose your brand's primary color</Description>
        </ColorField>
        <Button
          className="w-full"
          isDisabled={!value}
          isPending={isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? "Saving..." : "Save Color"}
        </Button>
      </Form>
    );
  },
};

export const WithColorPresets: Story = {
  render: () => {
    const [value, setValue] = useState<Color | null>(parseColor("#0485F7"));
    const presets = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];

    return (
      <div className="flex flex-col gap-4">
        <ColorField className="w-[280px]" name="color" value={value} onChange={setValue}>
          <Label>Color</Label>
          <ColorInputGroup>
            <ColorInputGroup.Prefix>
              <ColorSwatch color={value?.toString("hex") || "#E4E4E7"} size="xs" />
            </ColorInputGroup.Prefix>
            <ColorInputGroup.Input />
          </ColorInputGroup>
          <Description>Select or enter a color</Description>
        </ColorField>
        <div className="flex gap-2">
          {presets.map((preset) => (
            <ColorSwatch
              key={preset}
              className="cursor-pointer"
              color={preset}
              size="lg"
              onClick={() => setValue(parseColor(preset))}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const AllVariations: Story = {
  render: () => {
    const [color1, setColor1] = useState<Color | null>(parseColor("#0485F7"));
    const [color2, setColor2] = useState<Color | null>(parseColor("#10B981"));
    const [color3, setColor3] = useState<Color | null>(parseColor("#F43F5E"));

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <ColorField
            isRequired
            className="w-[280px]"
            name="color1"
            value={color1}
            onChange={setColor1}
          >
            <Label>With Prefix Icon</Label>
            <ColorInputGroup>
              <ColorInputGroup.Prefix>
                <ColorSwatch color={color1 ?? undefined} size="xs" />
              </ColorInputGroup.Prefix>
              <ColorInputGroup.Input />
            </ColorInputGroup>
            <Description>Enter a hex color</Description>
          </ColorField>

          <ColorField
            isRequired
            className="w-[280px]"
            name="color2"
            value={color2}
            onChange={setColor2}
          >
            <Label>With Suffix</Label>
            <ColorInputGroup>
              <ColorInputGroup.Input />
              <ColorInputGroup.Suffix>
                <ColorSwatch color={color2 ?? undefined} size="xs" />
              </ColorInputGroup.Suffix>
            </ColorInputGroup>
            <Description>Enter a hex color</Description>
          </ColorField>

          <ColorField
            isRequired
            className="w-[280px]"
            name="color3"
            value={color3}
            onChange={setColor3}
          >
            <Label>Secondary Variant</Label>
            <ColorInputGroup variant="secondary">
              <ColorInputGroup.Prefix>
                <ColorSwatch color={color3 ?? undefined} size="xs" />
              </ColorInputGroup.Prefix>
              <ColorInputGroup.Input />
            </ColorInputGroup>
            <Description>Enter a hex color</Description>
          </ColorField>
        </div>
      </div>
    );
  },
};
