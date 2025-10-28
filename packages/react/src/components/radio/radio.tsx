"use client";

import type {RadioProps as RadioPrimitiveProps, RadioRenderProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {Radio as RadioPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose.js";

import {radioVariants} from "./radio.styles.js";

interface RadioContext {
  slots?: ReturnType<typeof radioVariants>;
  state?: RadioRenderProps;
}
const RadioContext = createContext<RadioContext>({});

/* -------------------------------------------------------------------------------------------------
 * Radio Root
 * -----------------------------------------------------------------------------------------------*/

interface RadioRootProps extends RadioPrimitiveProps {
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

/* -----------------------------------------------------------------------------------------------*/
interface RadioControlProps extends React.HTMLAttributes<HTMLSpanElement> {}
const RadioControl = ({children, className, ...props}: RadioControlProps) => {
  const {slots} = useContext(RadioContext);

  return (
    <span className={slots?.control({className})} data-slot="radio-control" {...props}>
      {children}
    </span>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface RadioIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
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

/* -----------------------------------------------------------------------------------------------*/
interface RadioContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const RadioContent = ({children, className, ...props}: RadioContentProps) => {
  const {slots} = useContext(RadioContext);

  return (
    <div className={slots?.content({className})} data-slot="radio-content" {...props}>
      {children}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------*/

export {RadioRoot, RadioControl, RadioIndicator, RadioContent};
export type {RadioRootProps, RadioControlProps, RadioIndicatorProps, RadioContentProps};
