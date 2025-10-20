"use client";

import type {RadioGroupVariants} from "./radio-group.styles";
import type {
  RadioGroupProps as RadioGroupPrimitiveProps,
  RadioProps as RadioPrimitiveProps,
  RadioRenderProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {RadioGroup as RadioGroupPrimitive, Radio as RadioPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {radioGroupVariants, radioVariants} from "./radio-group.styles";
/* -------------------------------------------------------------------------------------------------
 * RadioGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface RadioGroupRootProps extends RadioGroupPrimitiveProps, RadioGroupVariants {
  ref?: React.Ref<HTMLDivElement>;
}
const RadioGroupRoot = ({children, className, ref, ...props}: RadioGroupRootProps) => {
  const styles = React.useMemo(() => radioGroupVariants(), []);

  return (
    <RadioGroupPrimitive
      ref={ref}
      data-slot="radio-group"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </RadioGroupPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Radio
 * -----------------------------------------------------------------------------------------------*/
interface RadioContext {
  slots?: ReturnType<typeof radioVariants>;
  state?: RadioRenderProps;
}
const RadioContext = createContext<RadioContext>({});

interface RadioProps extends RadioPrimitiveProps {
  /** The name of the radio button, used when submitting an HTML form. */
  name?: string;
  ref?: React.Ref<HTMLLabelElement>;
}
const Radio = ({children, className, ref, ...props}: RadioProps) => {
  const slots = React.useMemo(() => radioVariants(), []);

  return (
    <RadioPrimitive
      ref={ref}
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
interface RadioControlProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>;
}
const RadioControl = ({children, className, ref, ...props}: RadioControlProps) => {
  const {slots} = useContext(RadioContext);

  return (
    <span ref={ref} className={slots?.control({className})} data-slot="radio-control" {...props}>
      {children}
    </span>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface RadioIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode | ((props: RadioRenderProps) => React.ReactNode);
  ref?: React.Ref<HTMLSpanElement>;
}
const RadioIndicator = ({children, className, ref, ...props}: RadioIndicatorProps) => {
  const {slots, state} = useContext(RadioContext);
  const content =
    typeof children === "function" ? children(state ?? ({} as RadioRenderProps)) : children;

  return (
    <span
      ref={ref}
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
interface RadioContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
const RadioContent = ({children, className, ref, ...props}: RadioContentProps) => {
  const {slots} = useContext(RadioContext);

  return (
    <div ref={ref} className={slots?.content({className})} data-slot="radio-content" {...props}>
      {children}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------*/
export {RadioGroupRoot, Radio, RadioControl, RadioIndicator, RadioContent};
export type {
  RadioGroupRootProps,
  RadioProps,
  RadioControlProps,
  RadioIndicatorProps,
  RadioContentProps,
};
