import {Label, Slider} from "@heroui/react";

export function Vertical() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Slider className="h-full" defaultValue={30} orientation="vertical">
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    </div>
  );
}
