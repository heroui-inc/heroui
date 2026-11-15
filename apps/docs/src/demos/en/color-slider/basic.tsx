"use client";

import type {ColorSliderProps} from "@heroui/react";

import {ColorSlider, Label} from "@heroui/react";

export function Basic(props: ColorSliderProps) {
  return (
    <ColorSlider {...props} className="w-full max-w-xs" defaultValue="hsl(0, 100%, 50%)">
      <Label />
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  );
}
