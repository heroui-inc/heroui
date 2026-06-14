"use client";

import type {InputVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {inputVariants} from "@heroui/styles";
import {memo, useContext, useMemo} from "react";
import {Input as InputPrimitive} from "react-aria-components/Input";

import {composeTwRenderProps} from "../../utils";
import {ComboBoxContext} from "../combo-box";
import {TextFieldContext} from "../textfield";

/* -------------------------------------------------------------------------------------------------
 * Input Root
 * -----------------------------------------------------------------------------------------------*/
interface InputRootProps extends ComponentPropsWithRef<typeof InputPrimitive>, InputVariants {}

const InputRoot = memo(function InputRoot({
  className,
  fullWidth,
  variant: variantProp,
  ...rest
}: InputRootProps) {
  const textFieldContext = useContext(TextFieldContext);
  const comboBoxContext = useContext(ComboBoxContext);

  // Use variant from context if not explicitly provided
  const variant = variantProp ?? textFieldContext.variant ?? comboBoxContext.variant;
  const styles = useMemo(() => inputVariants({fullWidth, variant}), [fullWidth, variant]);

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="input"
      {...rest}
    />
  );
});

InputRoot.displayName = "HeroUI.Input";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputRoot};

export type {InputRootProps};
