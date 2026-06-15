"use client";

import type {NumberFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {numberFieldVariants} from "@heroui/styles";
import React, {createContext, isValidElement, memo, useContext, useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";
import {NumberField as NumberFieldPrimitive} from "react-aria-components/NumberField";

import {composeTwRenderProps} from "../../utils/compose";
import {IconMinus, IconPlus} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * NumberField Context
 * -----------------------------------------------------------------------------------------------*/
type NumberFieldContext = {
  decrementButtonClassName?: string;
  groupClassName?: string;
  incrementButtonClassName?: string;
  inputClassName?: string;
};

const NumberFieldContext = createContext<NumberFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * NumberField Root
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldRootProps
  extends ComponentPropsWithRef<typeof NumberFieldPrimitive>, NumberFieldVariants {}

const NumberFieldRoot = memo(function NumberFieldRoot({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: NumberFieldRootProps) {
  const slots = useMemo(() => numberFieldVariants({fullWidth, variant}), [fullWidth, variant]);
  const contextValue = useMemo<NumberFieldContext>(
    () => ({
      decrementButtonClassName: slots.decrementButton(),
      groupClassName: slots.group(),
      incrementButtonClassName: slots.incrementButton(),
      inputClassName: slots.input(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <NumberFieldContext value={contextValue}>
      <NumberFieldPrimitive
        data-slot="number-field"
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </NumberFieldPrimitive>
    </NumberFieldContext>
  );
});

NumberFieldRoot.displayName = "HeroUI.NumberField";

/* -------------------------------------------------------------------------------------------------
 * NumberField Group
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const NumberFieldGroup = memo(function NumberFieldGroup({
  children,
  className,
  ...props
}: NumberFieldGroupProps) {
  const {groupClassName} = useContext(NumberFieldContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, groupClassName),
    [className, groupClassName],
  );

  return (
    <GroupPrimitive className={resolvedClassName} data-slot="number-field-group" {...props}>
      {typeof children === "function" ? (values) => children(values) : children}
    </GroupPrimitive>
  );
});

NumberFieldGroup.displayName = "HeroUI.NumberField.Group";

/* -------------------------------------------------------------------------------------------------
 * NumberField Input
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const NumberFieldInput = memo(function NumberFieldInput({
  className,
  ...props
}: NumberFieldInputProps) {
  const {inputClassName} = useContext(NumberFieldContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, inputClassName),
    [className, inputClassName],
  );

  return <InputPrimitive className={resolvedClassName} data-slot="number-field-input" {...props} />;
});

NumberFieldInput.displayName = "HeroUI.NumberField.Input";

/* -------------------------------------------------------------------------------------------------
 * NumberField Increment Button
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldIncrementButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const NumberFieldIncrementButton = memo(function NumberFieldIncrementButton({
  children,
  className,
  ...props
}: NumberFieldIncrementButtonProps) {
  const {incrementButtonClassName} = useContext(NumberFieldContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, incrementButtonClassName),
    [className, incrementButtonClassName],
  );

  return (
    <ButtonPrimitive
      className={resolvedClassName}
      data-slot="number-field-increment-button"
      slot="increment"
      {...props}
    >
      {children && isValidElement(children) ? (
        children
      ) : (
        <IconPlus data-slot="number-field-increment-button-icon" />
      )}
    </ButtonPrimitive>
  );
});

NumberFieldIncrementButton.displayName = "HeroUI.NumberField.IncrementButton";

/* -------------------------------------------------------------------------------------------------
 * NumberField Decrement Button
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldDecrementButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const NumberFieldDecrementButton = memo(function NumberFieldDecrementButton({
  children,
  className,
  ...props
}: NumberFieldDecrementButtonProps) {
  const {decrementButtonClassName} = useContext(NumberFieldContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, decrementButtonClassName),
    [className, decrementButtonClassName],
  );

  return (
    <ButtonPrimitive
      className={resolvedClassName}
      data-slot="number-field-decrement-button"
      slot="decrement"
      {...props}
    >
      {children && isValidElement(children) ? (
        children
      ) : (
        <IconMinus data-slot="number-field-decrement-button-icon" />
      )}
    </ButtonPrimitive>
  );
});

NumberFieldDecrementButton.displayName = "HeroUI.NumberField.DecrementButton";

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
