"use client";

import type {InputGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {inputGroupVariants} from "@heroui/styles";
import React, {createContext, memo, useCallback, useContext, useMemo} from "react";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";
import {TextArea as TextAreaPrimitive} from "react-aria-components/TextArea";

import {composeTwRenderProps} from "../../utils/compose";
import {TextFieldContext} from "../textfield";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Context
 * -----------------------------------------------------------------------------------------------*/
type InputGroupContext = {
  baseClassName?: string;
  inputClassName?: string;
  prefixClassName?: string;
  suffixClassName?: string;
};

const InputGroupContext = createContext<InputGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * InputGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupRootProps
  extends ComponentPropsWithRef<typeof GroupPrimitive>, InputGroupVariants {}

const InputGroupRoot = memo(function InputGroupRoot({
  children,
  className,
  fullWidth,
  onClick,
  variant,
  ...props
}: InputGroupRootProps) {
  const textFieldContext = useContext(TextFieldContext);
  const resolvedVariant = variant ?? textFieldContext?.variant;
  const groupRef = React.useRef<HTMLDivElement>(null);

  const slots = useMemo(
    () => inputGroupVariants({fullWidth, variant: resolvedVariant}),
    [fullWidth, resolvedVariant],
  );
  const contextValue = useMemo<InputGroupContext>(
    () => ({
      baseClassName: slots.base(),
      inputClassName: slots.input(),
      prefixClassName: slots.prefix(),
      suffixClassName: slots.suffix(),
    }),
    [slots],
  );

  const baseClassName = useMemo(() => slots.base(), [slots]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const input = groupRef.current?.querySelector("input");

      if (input && target !== input && !input.contains(target)) {
        input.focus();
      }

      onClick?.(e);
    },
    [onClick],
  );

  return (
    <InputGroupContext value={contextValue}>
      <GroupPrimitive
        {...props}
        ref={groupRef}
        className={composeTwRenderProps(className, baseClassName)}
        data-slot="input-group"
        onClick={handleClick}
      >
        {typeof children === "function" ? (renderProps) => children(renderProps) : children}
      </GroupPrimitive>
    </InputGroupContext>
  );
});

InputGroupRoot.displayName = "HeroUI.InputGroup";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Input
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const InputGroupInput = memo(function InputGroupInput({className, ...props}: InputGroupInputProps) {
  const {inputClassName} = useContext(InputGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, inputClassName),
    [className, inputClassName],
  );

  return <InputPrimitive className={resolvedClassName} data-slot="input-group-input" {...props} />;
});

InputGroupInput.displayName = "HeroUI.InputGroup.Input";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Prefix
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupPrefixProps extends ComponentPropsWithRef<"div"> {}

const InputGroupPrefix = memo(function InputGroupPrefix({
  children,
  className,
  ...props
}: InputGroupPrefixProps) {
  const {prefixClassName} = useContext(InputGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, prefixClassName) as string,
    [className, prefixClassName],
  );

  return (
    <div className={resolvedClassName} data-slot="input-group-prefix" {...props}>
      {children}
    </div>
  );
});

InputGroupPrefix.displayName = "HeroUI.InputGroup.Prefix";

/* -------------------------------------------------------------------------------------------------
 * InputGroup TextArea
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupTextAreaProps extends ComponentPropsWithRef<typeof TextAreaPrimitive> {}

const InputGroupTextArea = memo(function InputGroupTextArea({
  className,
  ...props
}: InputGroupTextAreaProps) {
  const {inputClassName} = useContext(InputGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, inputClassName),
    [className, inputClassName],
  );

  return (
    <TextAreaPrimitive className={resolvedClassName} data-slot="input-group-textarea" {...props} />
  );
});

InputGroupTextArea.displayName = "HeroUI.InputGroup.TextArea";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Suffix
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupSuffixProps extends ComponentPropsWithRef<"div"> {}

const InputGroupSuffix = memo(function InputGroupSuffix({
  children,
  className,
  ...props
}: InputGroupSuffixProps) {
  const {suffixClassName} = useContext(InputGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, suffixClassName) as string,
    [className, suffixClassName],
  );

  return (
    <div className={resolvedClassName} data-slot="input-group-suffix" {...props}>
      {children}
    </div>
  );
});

InputGroupSuffix.displayName = "HeroUI.InputGroup.Suffix";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputGroupRoot, InputGroupInput, InputGroupTextArea, InputGroupPrefix, InputGroupSuffix};

export type {
  InputGroupRootProps,
  InputGroupInputProps,
  InputGroupTextAreaProps,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
};
