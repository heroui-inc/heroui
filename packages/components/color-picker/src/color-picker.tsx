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
    Component,
    getColorPickerProps,
    getColorInputProps,
    handleCopyToClipboard,
    getCopyButtonProps,
    getTooltipButtonProps,
    getInnerWrapperProps,
    getInputProps,
  } = useColorPicker({
    ...props,
    ref,
  });

  return (
    <Component {...getColorPickerProps()}>
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
        {...getInputProps()}
      />
    </Component>
  );
});

ColorPicker.displayName = "HeroUI.ColorPicker";

export default ColorPicker;
