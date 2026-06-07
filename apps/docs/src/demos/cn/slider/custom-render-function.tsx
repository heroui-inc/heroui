"use client";

import {Label, Slider} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <Slider
      className="w-full max-w-xs"
      defaultValue={30}
      render={(props) => <div {...props} data-custom="foo" />}
    >
      <Label>音量</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
