import {Label, Slider} from "@heroui/react";

export function CustomStyles() {
  return (
    <Slider
      className="w-full max-w-xs [--slider-fill:#525252] dark:[--slider-fill:#e5e5e5]"
      defaultValue={30}
    >
      <Label className="font-medium text-foreground">Volume</Label>
      <Slider.Output className="text-xs font-medium text-muted tabular-nums" />
      <Slider.Track className="bg-muted/35 data-[fill-end=true]:border-e-(--slider-fill)! data-[fill-start=true]:border-s-(--slider-fill)!">
        <Slider.Fill className="bg-(--slider-fill)" />
        <Slider.Thumb className="bg-(--slider-fill)! after:rounded-lg after:border after:border-border after:bg-background! after:shadow-md" />
      </Slider.Track>
    </Slider>
  );
}
