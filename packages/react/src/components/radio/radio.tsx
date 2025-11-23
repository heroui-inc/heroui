"use client";

import type {ComponentPropsWithRef} from "react";
import type {RadioRenderProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {Radio as RadioPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {radioVariants} from "./radio.styles";

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
interface RadioControlProps extends ComponentPropsWithRef<"span"> {}

const RadioControl = ({children, className, ...props}: RadioControlProps) => {
  const {slots} = useContext(RadioContext);

  return (
    <span className={slots?.control({className})} data-slot="radio-control" {...props}>
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Radio Indicator
 * -----------------------------------------------------------------------------------------------*/
interface RadioIndicatorProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
  children?: React.ReactNode | ((props: RadioRenderProps) => React.ReactNode);
}

const RadioIndicator = ({children, className, ...props}: RadioIndicatorProps) => {
  const {slots, state} = useContext(RadioContext);
  const content =
    typeof children === "function" ? children(state ?? ({} as RadioRenderProps)) : children;

  return (
    <span
      aria-hidden="true"
      className={slots?.indicator({className})}
      data-slot="radio-indicator"
      {...props}
    >
      {content}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Radio Content
 * -----------------------------------------------------------------------------------------------*/
interface RadioContentProps extends ComponentPropsWithRef<"div"> {}

const RadioContent = ({children, className, ...props}: RadioContentProps) => {
  const {slots} = useContext(RadioContext);

  return (
    <div className={slots?.content({className})} data-slot="radio-content" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {RadioRoot, RadioControl, RadioIndicator, RadioContent};

export type {RadioRootProps, RadioControlProps, RadioIndicatorProps, RadioContentProps};
