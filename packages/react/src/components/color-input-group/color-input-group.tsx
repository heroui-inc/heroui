"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ColorInputGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {InputProps as InputPrimitiveProps} from "react-aria-components/Input";

import {colorInputGroupVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ColorInputGroupContext = {
  inputClassName?: string;
  prefixClassName?: string;
  suffixClassName?: string;
};

const ColorInputGroupContext = createContext<ColorInputGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorInputGroupRootProps
  extends ComponentPropsWithRef<typeof GroupPrimitive>, ColorInputGroupVariants {}

const ColorInputGroupRoot = memo(function ColorInputGroupRoot({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: ColorInputGroupRootProps) {
  const slots = useMemo(() => colorInputGroupVariants({fullWidth, variant}), [fullWidth, variant]);
  const contextValue = useMemo<ColorInputGroupContext>(
    () => ({
      inputClassName: slots.input(),
      prefixClassName: slots.prefix(),
      suffixClassName: slots.suffix(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <ColorInputGroupContext value={contextValue}>
      <GroupPrimitive
        className={composeTwRenderProps(className, baseClassName)}
        data-slot="color-input-group"
        {...props}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </GroupPrimitive>
    </ColorInputGroupContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Prefix
 * -----------------------------------------------------------------------------------------------*/
interface ColorInputGroupPrefixProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ColorInputGroupPrefixInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ColorInputGroupPrefixProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ColorInputGroupPrefixProps<E>>) {
  const {prefixClassName} = useContext(ColorInputGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, prefixClassName) as string,
    [className, prefixClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="color-input-group-prefix" {...(props as any)}>
      {children}
    </dom.div>
  );
}

const ColorInputGroupPrefix = memo(ColorInputGroupPrefixInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: ColorInputGroupPrefixProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ColorInputGroupPrefixProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Input
 * -----------------------------------------------------------------------------------------------*/
interface ColorInputGroupInputProps extends InputPrimitiveProps {
  className?: string;
}

const ColorInputGroupInput = memo(function ColorInputGroupInput({
  className,
  ...props
}: ColorInputGroupInputProps) {
  const {inputClassName} = useContext(ColorInputGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, inputClassName),
    [className, inputClassName],
  );

  return (
    <InputPrimitive className={resolvedClassName} data-slot="color-input-group-input" {...props} />
  );
});

/* -------------------------------------------------------------------------------------------------
 * ColorInputGroup Suffix
 * -----------------------------------------------------------------------------------------------*/
interface ColorInputGroupSuffixProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ColorInputGroupSuffixInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ColorInputGroupSuffixProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ColorInputGroupSuffixProps<E>>) {
  const {suffixClassName} = useContext(ColorInputGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, suffixClassName) as string,
    [className, suffixClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="color-input-group-suffix" {...(props as any)}>
      {children}
    </dom.div>
  );
}

const ColorInputGroupSuffix = memo(ColorInputGroupSuffixInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: ColorInputGroupSuffixProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ColorInputGroupSuffixProps<E>>,
) => React.JSX.Element;

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
