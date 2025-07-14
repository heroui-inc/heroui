import type {SliderValue} from "@heroui/react";

import {Slider} from "@heroui/react";

export default function App() {
  const formatMillisecondsToHHMMSS = (milliseconds: number) => {
    if (isNaN(milliseconds) || milliseconds < 0) {
      // Default for invalid input
      return "00:00:00";
    }

    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);

    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    // The slider's main value will be formatted using default or formatOptions
    // The tooltip will use the hh:mm:ss format from getTooltipValue
    <Slider
      hideValue
      showTooltip
      // Example: 1 hour, 1 minute, 5 seconds in ms
      defaultValue={3665000}
      getTooltipValue={(value: SliderValue) => formatMillisecondsToHHMMSS(value as number)}
      // 1-second steps
      label="Video Duration (hh:mm:ss)"
      // Example: 2 hours in ms
      maxValue={7200000}
      // Single thumb, SliderValue is a number.
      step={1000}
    />
  );
}
