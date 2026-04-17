"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {RadioRenderProps} from "react-aria-components/RadioGroup";

import {radioVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Radio as RadioPrimitive} from "react-aria-components/RadioGroup";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Radio Context
 * -----------------------------------------------------------------------------------------------*/
interface RadioContext {
  slots?: ReturnType<typeof radioVariants>;
  state?: RadioRenderProps;
}

const RadioContext = createContext<RadioContext>({});

/* -------------------------------------------------------------------------------------------------
 * Radio Root
 * -----------------------------------------------------------------------------------------------*/
interface RadioRootProps extends ComponentPropsWithRef<typeof RadioPrimitive> {
  /** The name of the radio button, used when submitting an HTML form. */
  name?: string;
}

const RadioRoot = ({children, className, ...props}: RadioRootProps) => {
  const slots = React.useMemo(() => radioVariants(), []);

  return (
    <RadioPrimitive
      data-slot="radio"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <RadioContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </RadioContext>
      )}
    </RadioPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Radio Control
 * -----------------------------------------------------------------------------------------------*/
interface RadioControlProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const RadioControl = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: RadioControlProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof RadioControlProps<E>>) => {
  const {slots} = useContext(RadioContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="radio-control"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Radio Indicator
 * -----------------------------------------------------------------------------------------------*/
interface RadioIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode | ((props: RadioRenderProps) => React.ReactNode);
  className?: string;
}

const RadioIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: RadioIndicatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof RadioIndicatorProps<E>>) => {
  const {slots, state} = useContext(RadioContext);
  const content =
    typeof children === "function" ? children(state ?? ({} as RadioRenderProps)) : children;

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="radio-indicator"
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Radio Content
 * -----------------------------------------------------------------------------------------------*/
interface RadioContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const RadioContent = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: RadioContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof RadioContentProps<E>>) => {
  const {slots} = useContext(RadioContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.content, className)}
      data-slot="radio-content"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {RadioRoot, RadioControl, RadioIndicator, RadioContent};

export type {RadioRootProps, RadioControlProps, RadioIndicatorProps, RadioContentProps};
