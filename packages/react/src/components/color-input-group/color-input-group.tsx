"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ColorInputGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {InputProps as InputPrimitiveProps} from "react-aria-components/Input";

import {colorInputGroupVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

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
interface ColorInputGroupPrefixProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ColorInputGroupPrefix = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ColorInputGroupPrefixProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ColorInputGroupPrefixProps<E>>) => {
  const {slots} = useContext(ColorInputGroupContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.prefix, className)}
      data-slot="color-input-group-prefix"
      {...(props as any)}
    >
      {children}
    </dom.div>
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
interface ColorInputGroupSuffixProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ColorInputGroupSuffix = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ColorInputGroupSuffixProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ColorInputGroupSuffixProps<E>>) => {
  const {slots} = useContext(ColorInputGroupContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.suffix, className)}
      data-slot="color-input-group-suffix"
      {...(props as any)}
    >
      {children}
    </dom.div>
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
