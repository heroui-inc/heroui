import {Label, Slider} from "@heroui/react";

export function CustomStyles() {
  return (
    <Slider
      className="w-full max-w-xs [--slider-fill:#525252] dark:[--slider-fill:#d4d4d4]"
      defaultValue={30}
    >
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Volume</Label>
      <Slider.Output className="text-xs font-medium text-neutral-600 tabular-nums dark:text-neutral-400" />
      <Slider.Track className="bg-neutral-200/80 dark:bg-neutral-800">
        <Slider.Fill className="bg-(--slider-fill)" />
        <Slider.Thumb className="border border-neutral-400/40 bg-background shadow-md after:bg-(--slider-fill)" />
      </Slider.Track>
    </Slider>
  );
}
