"use client";

import type {InputGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {inputGroupVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  Group as GroupPrimitive,
  Input as InputPrimitive,
  TextArea as TextAreaPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {TextFieldContext} from "../text-field";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Context
 * -----------------------------------------------------------------------------------------------*/
type InputGroupContext = {
  slots?: ReturnType<typeof inputGroupVariants>;
};

const InputGroupContext = createContext<InputGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * InputGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupRootProps
  extends ComponentPropsWithRef<typeof GroupPrimitive>, InputGroupVariants {}

const InputGroupRoot = ({
  children,
  className,
  fullWidth,
  onClick,
  variant,
  ...props
}: InputGroupRootProps) => {
  const textFieldContext = useContext(TextFieldContext);
  const resolvedVariant = variant ?? textFieldContext?.variant;
  const groupRef = React.useRef<HTMLDivElement>(null);

  const slots = React.useMemo(
    () => inputGroupVariants({fullWidth, variant: resolvedVariant}),
    [fullWidth, resolvedVariant],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const input = groupRef.current?.querySelector("input");

    if (input && target !== input && !input.contains(target)) {
      input.focus();
    }

    onClick?.(e);
  };

  return (
    <InputGroupContext value={{slots}}>
      <GroupPrimitive
        {...props}
        ref={groupRef}
        className={composeTwRenderProps(className, slots?.base())}
        data-slot="input-group"
        onClick={handleClick}
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </GroupPrimitive>
    </InputGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * InputGroup Input
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const InputGroupInput = ({className, ...props}: InputGroupInputProps) => {
  const {slots} = useContext(InputGroupContext);

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, slots?.input())}
      data-slot="input-group-input"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * InputGroup Prefix
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupPrefixProps extends ComponentPropsWithRef<"div"> {}

const InputGroupPrefix = ({children, className, ...props}: InputGroupPrefixProps) => {
  const {slots} = useContext(InputGroupContext);

  return (
    <div
      className={composeSlotClassName(slots?.prefix, className)}
      data-slot="input-group-prefix"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * InputGroup TextArea
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupTextAreaProps extends ComponentPropsWithRef<typeof TextAreaPrimitive> {}

const InputGroupTextArea = ({className, ...props}: InputGroupTextAreaProps) => {
  const {slots} = useContext(InputGroupContext);

  return (
    <TextAreaPrimitive
      className={composeTwRenderProps(className, slots?.input())}
      data-slot="input-group-textarea"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * InputGroup Suffix
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupSuffixProps extends ComponentPropsWithRef<"div"> {}

const InputGroupSuffix = ({children, className, ...props}: InputGroupSuffixProps) => {
  const {slots} = useContext(InputGroupContext);

  return (
    <div
      className={composeSlotClassName(slots?.suffix, className)}
      data-slot="input-group-suffix"
      {...props}
    >
      {children}
    </div>
  );
};

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
