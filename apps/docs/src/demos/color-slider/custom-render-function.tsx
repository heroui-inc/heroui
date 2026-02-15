import {ColorSlider, Label} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <ColorSlider
      channel="hue"
      className="w-full max-w-xs"
      defaultValue="hsl(0, 100%, 50%)"
      render={(props) => <div {...props} data-custom="foo" />}
    >
      <Label>Hue</Label>
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  );
}
