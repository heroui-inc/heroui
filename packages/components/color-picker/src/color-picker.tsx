/* eslint-disable @typescript-eslint/no-unused-vars */

import {forwardRef} from "@heroui/system";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Tooltip} from "@heroui/tooltip";
import {CopyDocumentBulkIcon} from "@heroui/shared-icons";

import {useColorPicker, UseColorPickerProps} from "./use-color-picker";

export interface ColorPickerProps extends UseColorPickerProps {}

const ColorPicker = forwardRef<"input", ColorPickerProps>((props, ref) => {
  const {
    getColorPickerProps,
    getColorInputProps,
    handleCopyToClipboard,
    getCopyButtonProps,
    getTooltipButtonProps,
    getInnerWrapperProps,
  } = useColorPicker({
    ...props,
    ref,
  });

  return (
    <Input
      endContent={
        <Tooltip {...getTooltipButtonProps()}>
          <Button
            startContent={<CopyDocumentBulkIcon onClick={handleCopyToClipboard} />}
            {...getCopyButtonProps()}
          />
        </Tooltip>
      }
      startContent={
        <div slot="inner-wrapper" {...getInnerWrapperProps()}>
          <input {...getColorInputProps()} />
          <span className="font-bold text-xl">#</span>
        </div>
      }
      {...getColorPickerProps()}
    />
  );
});

ColorPicker.displayName = "HeroUI.ColorPicker";

export default ColorPicker;
