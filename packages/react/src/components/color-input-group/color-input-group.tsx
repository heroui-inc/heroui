"use client";

import type {ColorInputGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {InputProps as InputPrimitiveProps} from "react-aria-components";

import {colorInputGroupVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Group as GroupPrimitive, Input as InputPrimitive} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ColorInputGroupContext = {
  slots?: ReturnType<typeof colorInputGroupVariants>;
};

const ColorInputGroupContext = createContext<ColorInputGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorInputGroupRootProps
  extends ComponentPropsWithRef<typeof GroupPrimitive>, ColorInputGroupVariants {}

const ColorInputGroupRoot = ({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: ColorInputGroupRootProps) => {
  const slots = React.useMemo(
    () => colorInputGroupVariants({fullWidth, variant}),
    [fullWidth, variant],
  );

  return (
    <ColorInputGroupContext value={{slots}}>
      <GroupPrimitive
        className={composeTwRenderProps(className, slots?.base())}
        data-slot="color-input-group"
        {...props}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </GroupPrimitive>
    </ColorInputGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Prefix
 * -----------------------------------------------------------------------------------------------*/
interface ColorInputGroupPrefixProps extends ComponentPropsWithRef<"div"> {}

const ColorInputGroupPrefix = ({children, className, ...props}: ColorInputGroupPrefixProps) => {
  const {slots} = useContext(ColorInputGroupContext);

  return (
    <div
      className={composeSlotClassName(slots?.prefix, className)}
      data-slot="color-input-group-prefix"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Input
 * -----------------------------------------------------------------------------------------------*/
interface ColorInputGroupInputProps extends InputPrimitiveProps {
  className?: string;
}

const ColorInputGroupInput = ({className, ...props}: ColorInputGroupInputProps) => {
  const {slots} = useContext(ColorInputGroupContext);

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, slots?.input())}
      data-slot="color-input-group-input"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Suffix
 * -----------------------------------------------------------------------------------------------*/
interface ColorInputGroupSuffixProps extends ComponentPropsWithRef<"div"> {}

const ColorInputGroupSuffix = ({children, className, ...props}: ColorInputGroupSuffixProps) => {
  const {slots} = useContext(ColorInputGroupContext);

  return (
    <div
      className={composeSlotClassName(slots?.suffix, className)}
      data-slot="color-input-group-suffix"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorInputGroupRoot, ColorInputGroupInput, ColorInputGroupPrefix, ColorInputGroupSuffix};

export type {
  ColorInputGroupRootProps,
  ColorInputGroupInputProps,
  ColorInputGroupPrefixProps,
  ColorInputGroupSuffixProps,
};
