import type {UseRadioGroupProps} from "./use-radio-group";

import {forwardRef} from "@heroui/system";

import {RadioGroupProvider} from "./radio-group-context";
import {useRadioGroup} from "./use-radio-group";

export interface RadioGroupProps extends Omit<UseRadioGroupProps, "defaultChecked"> {}

const RadioGroup = forwardRef<"div", RadioGroupProps>((props, ref) => {
  const {
    Component,
    children,
    label,
    context,
    description,
    isInvalid,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  } = useRadioGroup({...props, ref});

  return (
    <Component {...getGroupProps()}>
      {label && <span {...getLabelProps()}>{label}</span>}
      <div {...getWrapperProps()}>
        <RadioGroupProvider value={context}>{children}</RadioGroupProvider>
      </div>
      {isInvalid && errorMessage ? (
        <div {...getErrorMessageProps()}>{errorMessage}</div>
      ) : description ? (
        <div {...getDescriptionProps()}>{description}</div>
      ) : null}
    </Component>
  );
});

RadioGroup.displayName = "HeroUI.RadioGroup";

export default RadioGroup;
