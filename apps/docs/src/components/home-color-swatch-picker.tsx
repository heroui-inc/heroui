import type {ColorSwatchPickerProps} from "react-aria-components";

import {cn} from "@/utils/cn";

import {ColorSwatchPicker, ColorSwatchPickerItem} from "./color-swatch-picker";

const colors = [
  "#0A0A0A", // black
  "#006FEE", // blue (keep)
  "#F31260", // red
  "#17C964", // green
  "#F59E0B", // amber/orange
  "#3F3F46", // soft gray
  "#4a8f87", // soft green
];

export function HomeColorSwatchPicker({
  className,
  onValueChange,
  value,
  ...props
}: ColorSwatchPickerProps & {
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <ColorSwatchPicker
      value={value}
      className={cn(
        className,
        "h-13 flex items-center gap-2 rounded-full bg-[#D7CDD0] px-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5),0_1px_4px_rgba(0,0,0,0.15)] backdrop-blur-md dark:bg-[#383435]/30 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)]",
      )}
      onChange={(color) => onValueChange?.(color.toString())}
      {...props}
    >
      {colors.map((color) => (
        <ColorSwatchPickerItem
          key={color}
          className="shadow-[inset_0px_2px_1px_0px_rgba(0,0,0,0.25)]"
          color={color}
          outlineColor={color}
          outlineOffsetColor="#D7CDD0"
        />
      ))}
    </ColorSwatchPicker>
  );
}
