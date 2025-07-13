"use client";

import type {RadioGroupVariants} from "./radio.styles";
import type {
  RadioGroupProps as RadioGroupPrimitiveProps,
  RadioProps as RadioPrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {RadioGroup as RadioGroupPrimitive, Radio as RadioPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {radioGroupVariants, radioVariants} from "./radio.styles";

/* -------------------------------------------------------------------------------------------------
 * RadioGroup Context
 * -----------------------------------------------------------------------------------------------*/

interface RadioGroupContext {
  slots?: ReturnType<typeof radioGroupVariants>;
}

const RadioGroupContext = createContext<RadioGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * RadioGroup
 * -----------------------------------------------------------------------------------------------*/

interface RadioGroupRootProps extends RadioGroupPrimitiveProps, RadioGroupVariants {}

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive>,
  RadioGroupRootProps
>(({children, className, orientation, ...props}, ref) => {
  const slots = React.useMemo(() => radioGroupVariants({orientation}), [orientation]);

  return (
    <RadioGroupContext.Provider value={{slots}}>
      <RadioGroupPrimitive
        ref={ref}
        data-radio-group
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </RadioGroupPrimitive>
    </RadioGroupContext.Provider>
  );
});

RadioGroupRoot.displayName = "HeroUI.RadioGroup.Root";

/* -----------------------------------------------------------------------------------------------*/

interface RadioGroupItemsProps extends React.HTMLAttributes<HTMLDivElement> {}

const RadioGroupItems = React.forwardRef<HTMLDivElement, RadioGroupItemsProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(RadioGroupContext);

    return (
      <div ref={ref} data-radio-group-items className={slots?.items({className})} {...props} />
    );
  },
);

RadioGroupItems.displayName = "HeroUI.RadioGroup.Items";

/* -------------------------------------------------------------------------------------------------
 * Radio
 * -----------------------------------------------------------------------------------------------*/

interface RadioContext {
  slots?: ReturnType<typeof radioVariants>;
}

const RadioContext = createContext<RadioContext>({});

interface RadioRootProps extends RadioPrimitiveProps {
  /** The name of the radio button, used when submitting an HTML form. */
  name?: string;
}

const RadioRoot = React.forwardRef<React.ElementRef<typeof RadioPrimitive>, RadioRootProps>(
  ({children, className, ...props}, ref) => {
    const slots = React.useMemo(
      () => radioVariants({isDisabled: props.isDisabled}),
      [props.isDisabled],
    );

    return (
      <RadioContext.Provider value={{slots}}>
        <RadioPrimitive
          ref={ref}
          data-radio
          {...props}
          className={composeTwRenderProps(className, slots.base())}
        >
          {(values) => <>{typeof children === "function" ? children(values) : children}</>}
        </RadioPrimitive>
      </RadioContext.Provider>
    );
  },
);

RadioRoot.displayName = "HeroUI.Radio.Root";

/* -----------------------------------------------------------------------------------------------*/

interface RadioIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

const RadioIndicator = React.forwardRef<HTMLSpanElement, RadioIndicatorProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(RadioContext);

    return (
      <span ref={ref} data-radio-wrapper className={slots?.wrapper({className})} {...props}>
        <span data-radio-indicator className={slots?.indicator()} />
      </span>
    );
  },
);

RadioIndicator.displayName = "HeroUI.Radio.Indicator";

/* -----------------------------------------------------------------------------------------------*/

interface RadioLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

const RadioLabel = React.forwardRef<HTMLSpanElement, RadioLabelProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(RadioContext);

    return <span ref={ref} data-radio-label className={slots?.label({className})} {...props} />;
  },
);

RadioLabel.displayName = "HeroUI.Radio.Label";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export const Radio = Object.assign(
  {},
  {
    Root: RadioRoot,
    Indicator: RadioIndicator,
    Label: RadioLabel,
  },
);

export const RadioGroup = Object.assign(
  {},
  {
    Root: RadioGroupRoot,
    Items: RadioGroupItems,
  },
);

export type {
  RadioGroupRootProps,
  RadioGroupItemsProps,
  RadioRootProps,
  RadioIndicatorProps,
  RadioLabelProps,
};
