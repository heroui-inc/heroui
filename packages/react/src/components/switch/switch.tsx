"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SwitchVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {switchVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Switch as SwitchPrimitive} from "react-aria-components/Switch";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Switch Context
 * -----------------------------------------------------------------------------------------------*/
interface SwitchContext {
  slots?: ReturnType<typeof switchVariants>;
}

const SwitchContext = createContext<SwitchContext>({});

/* -------------------------------------------------------------------------------------------------
 * Switch Root
 * -----------------------------------------------------------------------------------------------*/
interface SwitchRootProps extends ComponentPropsWithRef<typeof SwitchPrimitive>, SwitchVariants {}

const SwitchRoot = ({children, className, size, ...props}: SwitchRootProps) => {
  const slots = React.useMemo(() => switchVariants({size}), [size]);

  return (
    <SwitchContext value={{slots}}>
      <SwitchPrimitive
        data-slot="switch"
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SwitchPrimitive>
    </SwitchContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Switch Control
 * -----------------------------------------------------------------------------------------------*/
interface SwitchControlProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchControl = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchControlProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchControlProps<E>>) => {
  const {slots} = useContext(SwitchContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="switch-control"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Switch Thumb
 * -----------------------------------------------------------------------------------------------*/
interface SwitchThumbProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchThumb = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchThumbProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchThumbProps<E>>) => {
  const {slots} = useContext(SwitchContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.thumb, className)}
      data-slot="switch-thumb"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Switch Icon
 * -----------------------------------------------------------------------------------------------*/
interface SwitchIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchIcon = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchIconProps<E>>) => {
  const {slots} = useContext(SwitchContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.icon, className)}
      data-slot="switch-icon"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Switch Content
 * -----------------------------------------------------------------------------------------------*/
interface SwitchContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchContent = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: SwitchContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchContentProps<E>>) => {
  const {slots} = useContext(SwitchContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.content, className)}
      data-slot="switch-content"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SwitchRoot, SwitchControl, SwitchThumb, SwitchIcon, SwitchContent};

export type {
  SwitchRootProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchIconProps,
  SwitchContentProps,
};
