import {Label, Slider} from "@heroui/react";

export function Disabled() {
  return (
    <Slider isDisabled className="w-full max-w-xs" defaultValue={30}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
