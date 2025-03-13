/* eslint-disable @typescript-eslint/no-unused-vars */
import {forwardRef} from "@heroui/system";

export interface ColorPickerProps {}

const ColorPicker = forwardRef<"div", ColorPickerProps>((props, ref) => {
  return <div>ColorPicker</div>;
});

ColorPicker.displayName = "HeroUI.ColorPicker";

export default ColorPicker;
