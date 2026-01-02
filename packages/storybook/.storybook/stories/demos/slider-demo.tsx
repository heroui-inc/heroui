import React from "react";
import {Label, Slider} from "@heroui/react";

export function SliderDemo() {
  return (
    <div className="w-[256px] px-1">
      <Slider
        className="w-full max-w-xs"
        defaultValue={250}
        formatOptions={{currency: "USD", style: "currency"}}
        maxValue={500}
        minValue={0}
        step={10}
      >
        <Label>Price</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    </div>
  );
}

