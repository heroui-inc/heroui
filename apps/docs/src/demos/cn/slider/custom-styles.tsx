import {Label, Slider} from "@heroui/react";

export function CustomStyles() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={40}>
      <Label className="font-medium text-foreground">亮度</Label>
      <Slider.Output className="text-xs text-muted tabular-nums" />
      <Slider.Track className="bg-default">
        <Slider.Fill className="bg-accent" />
        <Slider.Thumb className="bg-accent after:bg-accent-foreground" />
      </Slider.Track>
    </Slider>
  );
}
