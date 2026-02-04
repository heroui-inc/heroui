"use client";

import {
  Button,
  ColorArea,
  ColorField,
  ColorInputGroup,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  Label,
  parseColor,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useState} from "react";

export function Controlled() {
  const [color, setColor] = useState(parseColor("#325578"));

  const colorPresets = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
  ];

  const shuffleColor = () => {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = 50 + Math.floor(Math.random() * 50); // 50-100%
    const randomLightness = 40 + Math.floor(Math.random() * 30); // 40-70%

    setColor(parseColor(`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`));
  };

  return (
    <div className="flex flex-col gap-4">
      <ColorPicker value={color} onChange={setColor}>
        <ColorPicker.Trigger>
          <ColorSwatch size="lg" />
          <Label>Pick a color</Label>
        </ColorPicker.Trigger>
        <ColorPicker.Popover className="gap-2">
          <ColorSwatchPicker className="justify-center pt-2" size="xs">
            {colorPresets.map((preset) => (
              <ColorSwatchPicker.Item key={preset} color={preset}>
                <ColorSwatchPicker.Swatch />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
          <ColorArea
            aria-label="Color area"
            className="max-w-full"
            colorSpace="hsb"
            xChannel="saturation"
            yChannel="brightness"
          >
            <ColorArea.Thumb />
          </ColorArea>
          <div className="flex items-center gap-2 px-1">
            <ColorSlider channel="hue" className="flex-1" colorSpace="hsb">
              <ColorSlider.Track>
                <ColorSlider.Thumb />
              </ColorSlider.Track>
            </ColorSlider>
            <Button
              isIconOnly
              aria-label="Shuffle color"
              size="sm"
              variant="tertiary"
              onPress={shuffleColor}
            >
              <Icon className="size-4" icon="gravity-ui:shuffle" />
            </Button>
          </div>
          <ColorField>
            <ColorInputGroup variant="secondary">
              <ColorInputGroup.Prefix>
                <ColorSwatch size="xs" />
              </ColorInputGroup.Prefix>
              <ColorInputGroup.Input />
            </ColorInputGroup>
          </ColorField>
        </ColorPicker.Popover>
      </ColorPicker>
      <p className="w-60 text-sm text-muted">
        Selected: <span className="font-medium">{color.toString("hex")}</span>
      </p>
    </div>
  );
}
