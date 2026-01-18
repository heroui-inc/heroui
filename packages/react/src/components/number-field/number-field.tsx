"use client";

import type {NumberFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {numberFieldVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  Button as ButtonPrimitive,
  Group as GroupPrimitive,
  Input as InputPrimitive,
  NumberField as NumberFieldPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {IconMinus, IconPlus} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * NumberField Context
 * -----------------------------------------------------------------------------------------------*/
type NumberFieldContext = {
  slots?: ReturnType<typeof numberFieldVariants>;
};

const NumberFieldContext = createContext<NumberFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * NumberField Root
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldRootProps
  extends ComponentPropsWithRef<typeof NumberFieldPrimitive>, NumberFieldVariants {}

const NumberFieldRoot = ({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: NumberFieldRootProps) => {
  const slots = React.useMemo(
    () => numberFieldVariants({fullWidth, variant}),
    [fullWidth, variant],
  );

  return (
    <NumberFieldContext value={{slots}}>
      <NumberFieldPrimitive
        data-slot="number-field"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </NumberFieldPrimitive>
    </NumberFieldContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * NumberField Group
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const NumberFieldGroup = ({children, className, ...props}: NumberFieldGroupProps) => {
  const {slots} = useContext(NumberFieldContext);

  return (
    <GroupPrimitive
      className={composeTwRenderProps(className, slots?.group())}
      data-slot="number-field-group"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </GroupPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * NumberField Input
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const NumberFieldInput = ({className, ...props}: NumberFieldInputProps) => {
  const {slots} = useContext(NumberFieldContext);

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, slots?.input())}
      data-slot="number-field-input"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * NumberField Increment Button
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldIncrementButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const NumberFieldIncrementButton = ({
  children,
  className,
  ...props
}: NumberFieldIncrementButtonProps) => {
  const {slots} = useContext(NumberFieldContext);

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, slots?.incrementButton())}
      data-slot="number-field-increment-button"
      slot="increment"
      {...props}
    >
      {children && React.isValidElement(children) ? (
        children
      ) : (
        <IconPlus data-slot="number-field-increment-button-icon" />
      )}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * NumberField Decrement Button
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldDecrementButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const NumberFieldDecrementButton = ({
  children,
  className,
  ...props
}: NumberFieldDecrementButtonProps) => {
  const {slots} = useContext(NumberFieldContext);

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, slots?.decrementButton())}
      data-slot="number-field-decrement-button"
      slot="decrement"
      {...props}
    >
      {children && React.isValidElement(children) ? (
        children
      ) : (
        <IconMinus data-slot="number-field-decrement-button-icon" />
      )}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  NumberFieldRoot,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrementButton,
  NumberFieldDecrementButton,
};

export type {
  NumberFieldRootProps,
  NumberFieldGroupProps,
  NumberFieldInputProps,
  NumberFieldIncrementButtonProps,
  NumberFieldDecrementButtonProps,
};
