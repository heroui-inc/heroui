"use client";

import type {LabelVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {labelVariants} from "@heroui/styles";
import {useContext} from "react";
import {Label as LabelPrimitive} from "react-aria-components/Label";

import {CheckboxButtonContext, CheckboxFieldIdContext} from "../checkbox/checkbox-context";
import {RadioButtonContext, RadioFieldIdContext} from "../radio/radio-context";
import {SwitchButtonContext, SwitchFieldIdContext} from "../switch/switch-context";

/* -------------------------------------------------------------------------------------------------
 * Label Root
 * -----------------------------------------------------------------------------------------------*/
interface LabelRootProps extends ComponentPropsWithRef<typeof LabelPrimitive>, LabelVariants {}

const LabelRoot = ({
  children,
  className,
  elementType,
  htmlFor,
  isDisabled,
  isInvalid,
  isRequired,
  ...rest
}: LabelRootProps) => {
  const {isInsideCheckboxButton} = useContext(CheckboxButtonContext);
  const {buttonState: switchButtonState} = useContext(SwitchButtonContext);
  const {isInsideRadioButton} = useContext(RadioButtonContext);
  const {inputId: checkboxInputId} = useContext(CheckboxFieldIdContext);
  const {inputId: switchInputId} = useContext(SwitchFieldIdContext);
  const {inputId: radioInputId} = useContext(RadioFieldIdContext);

  const isInToggleButton =
    isInsideCheckboxButton === true || switchButtonState != null || isInsideRadioButton === true;
  const fieldInputId = checkboxInputId ?? switchInputId ?? radioInputId;
  const isInToggleField = fieldInputId != null && !isInToggleButton;

  const resolvedElementType = elementType ?? (isInToggleButton ? "span" : undefined);
  const resolvedHtmlFor = htmlFor ?? (isInToggleField ? fieldInputId : undefined);

  const toggleButtonLabelProps = isInToggleButton
    ? ({slot: null} as unknown as ComponentPropsWithRef<typeof LabelPrimitive>)
    : {};

  return (
    <LabelPrimitive
      className={labelVariants({isRequired, isDisabled, isInvalid, className})}
      data-slot="label"
      elementType={resolvedElementType}
      htmlFor={resolvedHtmlFor}
      {...toggleButtonLabelProps}
      {...rest}
    >
      {children}
    </LabelPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {LabelRoot};

export type {LabelRootProps};
