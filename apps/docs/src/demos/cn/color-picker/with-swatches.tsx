import {
  ColorArea,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  Label,
} from "@heroui/react";

export function WithSwatches() {
  const presets = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
  ];

  return (
    <ColorPicker defaultValue="#F43F5E">
      <ColorPicker.Trigger>
        <ColorSwatch size="lg" />
        <Label>品牌色</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover>
        <ColorArea
          aria-label="取色区域"
          className="max-w-full"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb />
        </ColorArea>
        <ColorSlider aria-label="色相滑块" channel="hue" className="gap-1 px-1" colorSpace="hsb">
          <Label>色相</Label>
          <ColorSlider.Output className="text-muted" />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
        <ColorSwatchPicker className="justify-center px-1" size="xs">
          {presets.map((preset) => (
            <ColorSwatchPicker.Item key={preset} color={preset}>
              <ColorSwatchPicker.Swatch />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>
      </ColorPicker.Popover>
    </ColorPicker>
  );
}
