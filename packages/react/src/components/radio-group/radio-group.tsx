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
 * RadioGroup
 * -----------------------------------------------------------------------------------------------*/

interface RadioGroupRootProps extends RadioGroupPrimitiveProps, RadioGroupVariants {}

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive>,
  RadioGroupRootProps
>(({children, className, ...props}, ref) => {
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
});

RadioGroup.displayName = "HeroUI.RadioGroup";

/* -------------------------------------------------------------------------------------------------
 * Radio
 * -----------------------------------------------------------------------------------------------*/

interface RadioContext {
  slots?: ReturnType<typeof radioVariants>;
  state?: RadioRenderProps;
}

const RadioContext = createContext<RadioContext>({});

interface RadioRootProps extends RadioPrimitiveProps {
  /** The name of the radio button, used when submitting an HTML form. */
  name?: string;
}

const RadioRoot = React.forwardRef<React.ComponentRef<typeof RadioPrimitive>, RadioRootProps>(
  ({children, className, ...props}, ref) => {
    const slots = React.useMemo(() => radioVariants(), []);

    return (
      <RadioPrimitive
        ref={ref}
        data-slot="radio"
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => (
          <RadioContext.Provider value={{slots, state: values}}>
            {typeof children === "function" ? children(values) : children}
          </RadioContext.Provider>
        )}
      </RadioPrimitive>
    );
  },
);

RadioRoot.displayName = "HeroUI.Radio";

/* -----------------------------------------------------------------------------------------------*/

interface RadioControlProps extends React.HTMLAttributes<HTMLSpanElement> {}

const RadioControl = React.forwardRef<HTMLSpanElement, RadioControlProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(RadioContext);

    return (
      <span ref={ref} className={slots?.control({className})} data-slot="radio-control" {...props}>
        {children}
      </span>
    );
  },
);

RadioControl.displayName = "HeroUI.Radio.Control";

/* -----------------------------------------------------------------------------------------------*/

interface RadioIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode | ((props: RadioRenderProps) => React.ReactNode);
}

const RadioIndicator = React.forwardRef<HTMLSpanElement, RadioIndicatorProps>(
  ({children, className, ...props}, ref) => {
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
  },
);

RadioIndicator.displayName = "HeroUI.Radio.Indicator";

/* -----------------------------------------------------------------------------------------------*/

interface RadioContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const RadioContent = React.forwardRef<HTMLDivElement, RadioContentProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(RadioContext);

    return (
      <div ref={ref} className={slots?.content({className})} data-slot="radio-content" {...props}>
        {children}
      </div>
    );
  },
);

RadioContent.displayName = "HeroUI.Radio.Content";

/* ----------------------------------------------------------------------------------------------*/

const CompoundRadio = Object.assign(RadioRoot, {
  Control: RadioControl,
  Indicator: RadioIndicator,
  Content: RadioContent,
});

export type {
  RadioGroupRootProps,
  RadioGroupRootProps as RadioGroupProps,
  RadioRootProps,
  RadioRootProps as RadioProps,
  RadioIndicatorProps,
};

export {CompoundRadio as Radio, RadioGroup};
