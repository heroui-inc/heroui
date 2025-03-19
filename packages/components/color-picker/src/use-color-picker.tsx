import type {ColorPickerVariantProps, ColorPickerSlots, SlotsToClasses} from "@heroui/theme";

import {HTMLHeroUIProps, mapPropsVariants, PropGetter} from "@heroui/system";
import {colorPicker} from "@heroui/theme";
import {clsx, objectToDeps} from "@heroui/shared-utils";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {useMemo, useState} from "react";
import {InputProps} from "@heroui/input";
import {ButtonProps} from "@heroui/button";
import {useClipboard} from "@heroui/use-clipboard";
import {TooltipProps} from "@heroui/tooltip";

export interface UseColorPickerProps extends HTMLHeroUIProps, ColorPickerVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if className is passed, it will be added to the base slot.
   */
  classNames?: SlotsToClasses<ColorPickerSlots> & InputProps["classNames"];
}

export function useColorPicker(originalProps: UseColorPickerProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, colorPicker.variantKeys);
  const [colorValue, setColorValue] = useState<string>("#000000");
  const [copied, setCopied] = useState(false);
  const {copy} = useClipboard();

  const {classNames, className, as, ref, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      colorPicker({
        ...variantProps,
      }),
    [objectToDeps(variantProps)],
  );

  const getColorPickerProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...otherProps,
    };
  };

  const getInputProps = (): InputProps => {
    return {
      value: colorValue.replace("#", ""),
      maxLength: 6,
      minLength: 6,
      className: slots.input({class: classNames?.input}),
      classNames: {
        base: slots.input({class: classNames?.input}),
        input: "w-20 font-medium text-md me-2",
        inputWrapper: "p-2",
        label: "hidden",
      },
      radius: "sm",
      onValueChange(value) {
        setColorValue(`#${value.replace("#", "")}`);
      },
    };
  };

  const getCopyButtonProps = (): ButtonProps => {
    return {
      className: slots.copyBtn({class: classNames?.copyBtn}),
      isIconOnly: true,
      radius: "sm",
      variant: "bordered",
    };
  };

  const getTooltipButtonProps = (): TooltipProps => {
    return {
      content: "Copied",
      isOpen: copied,
    };
  };

  const getInnerWrapperProps = (): React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > => {
    return {
      className: "flex items-center gap-2",
    };
  };

  const getColorInputProps = (): React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > => {
    return {
      type: "color",
      value: colorValue,
      className:
        "color-swatch:border-none color-swatch:p-0 color-swatch-wrapper:border-none color-swatch-wrapper:p-0 moz-color-swatch:border-none moz-color-swatch:p-0 border-none rounded-md p-0 cursor-pointer size-6",
      onChange: (e) => setColorValue(e.target.value),
    };
  };

  const handleCopyToClipboard = () => {
    copy(colorValue);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return {
    Component,
    colorValue,
    slots,
    classNames,
    copied,
    getColorPickerProps,
    getColorInputProps,
    getCopyButtonProps,
    handleCopyToClipboard,
    getTooltipButtonProps,
    getInnerWrapperProps,
    getInputProps,
  };
}

export type UseColorPickerReturn = ReturnType<typeof useColorPicker>;
