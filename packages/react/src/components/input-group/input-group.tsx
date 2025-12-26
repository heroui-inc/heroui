"use client";

import type {InputGroupVariants} from "./input-group.styles";
import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext} from "react";
import {
  Group as GroupPrimitive,
  Input as InputPrimitive,
  TextArea as TextAreaPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

import {inputGroupVariants} from "./input-group.styles";

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
  isOnSurface,
  ...props
}: InputGroupRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  const slots = React.useMemo(
    () => inputGroupVariants({fullWidth, isOnSurface: isOnSurfaceValue}),
    [fullWidth, isOnSurfaceValue],
  );

  return (
    <InputGroupContext value={{slots}}>
      <GroupPrimitive
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
        data-slot="input-group"
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </GroupPrimitive>
    </InputGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * InputGroup Input
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {
  isOnSurface?: boolean;
}

const InputGroupInput = ({className, isOnSurface, ...props}: InputGroupInputProps) => {
  const {slots} = useContext(InputGroupContext);
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, slots?.input({isOnSurface: isOnSurfaceValue}))}
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
interface InputGroupTextAreaProps extends ComponentPropsWithRef<typeof TextAreaPrimitive> {
  isOnSurface?: boolean;
}

const InputGroupTextArea = ({className, isOnSurface, ...props}: InputGroupTextAreaProps) => {
  const {slots} = useContext(InputGroupContext);
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  return (
    <TextAreaPrimitive
      className={composeTwRenderProps(className, slots?.input({isOnSurface: isOnSurfaceValue}))}
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
