import {ssrSmoke} from "@heroui/testing/helpers";

import {ColorArea} from "@/components/color-area";
import {ColorPicker} from "@/components/color-picker";
import {ColorSlider} from "@/components/color-slider";
import {ColorSwatch} from "@/components/color-swatch";
import {Label} from "@/components/label";

describe("ColorPicker SSR", () => {
  it("renders without hydration mismatch with a closed trigger and fixed defaultValue", async () => {
    const {html} = await ssrSmoke(
      <ColorPicker defaultValue="#0485F7">
        <ColorPicker.Trigger>
          <ColorSwatch size="lg" />
          <Label>Pick a color</Label>
        </ColorPicker.Trigger>
        <ColorPicker.Popover>
          <ColorArea
            aria-label="Color area"
            colorSpace="hsb"
            xChannel="saturation"
            yChannel="brightness"
          >
            <ColorArea.Thumb />
          </ColorArea>
          <ColorSlider channel="hue" colorSpace="hsb">
            <Label>Hue</Label>
            <ColorSlider.Track>
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>
        </ColorPicker.Popover>
      </ColorPicker>,
    );

    expect(html).toContain('data-slot="color-picker"');
    expect(html).toContain('data-slot="color-picker-trigger"');
  });
});
