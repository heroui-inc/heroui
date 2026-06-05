"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {RadioButtonRenderProps, RadioFieldRenderProps} from "react-aria-components/RadioGroup";

import {radioVariants} from "@heroui/styles";
import React, {createContext, useContext, useId} from "react";
import {
  RadioButton as RadioButtonPrimitive,
  RadioField as RadioFieldPrimitive,
} from "react-aria-components/RadioGroup";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

import {RadioButtonContext, RadioFieldIdContext} from "./radio-context";

interface RadioFieldContextValue {
  slots?: ReturnType<typeof radioVariants>;
  fieldState?: RadioFieldRenderProps;
}

const RadioFieldContext = createContext<RadioFieldContextValue>({});

/* -------------------------------------------------------------------------------------------------
 * Radio (Field) — React Aria `RadioField`. RSC-safe: it does not inspect children.
 * -----------------------------------------------------------------------------------------------*/
interface RadioRootProps extends ComponentPropsWithRef<typeof RadioFieldPrimitive> {
  /** The name of the radio button, used when submitting an HTML form. */
  name?: string;
}

const RadioRoot = ({children, className, id, ...props}: RadioRootProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const slots = React.useMemo(() => radioVariants(), []);

  return (
    <RadioFieldIdContext value={{inputId}}>
      <RadioFieldPrimitive
        data-slot="radio"
        id={inputId}
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(fieldState) => (
          <RadioFieldContext value={{slots, fieldState}}>
            {typeof children === "function" ? children(fieldState) : children}
          </RadioFieldContext>
        )}
      </RadioFieldPrimitive>
    </RadioFieldIdContext>
  );
};

RadioRoot.displayName = "HeroUI.Radio";

/* -------------------------------------------------------------------------------------------------
 * Radio.Button — clickable `RadioButton` label wrapping the control + `Label`.
 * Keep `Description`/`FieldError` as siblings of `Radio.Button`.
 * -----------------------------------------------------------------------------------------------*/
interface RadioButtonRootProps extends ComponentPropsWithRef<typeof RadioButtonPrimitive> {}

const RadioButtonRoot = ({children, className, ...props}: RadioButtonRootProps) => {
  const {slots} = useContext(RadioFieldContext);

  return (
    <RadioButtonPrimitive
      data-slot="radio-button"
      {...props}
      className={composeTwRenderProps(className, slots?.button())}
    >
      {(buttonState) => (
        <RadioButtonContext value={{buttonState, isInsideRadioButton: true}}>
          {typeof children === "function" ? children(buttonState) : children}
        </RadioButtonContext>
      )}
    </RadioButtonPrimitive>
  );
};

RadioButtonRoot.displayName = "HeroUI.Radio.Button";

/* -----------------------------------------------------------------------------------------------*/

interface RadioControlProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode | ((props: RadioButtonRenderProps) => ReactNode);
  className?: string;
}

const RadioControl = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: RadioControlProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof RadioControlProps<E>>) => {
  const {fieldState, slots} = useContext(RadioFieldContext);
  const {buttonState} = useContext(RadioButtonContext);
  const renderState = (buttonState ?? fieldState) as RadioButtonRenderProps | undefined;

  return (
    <dom.span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="radio-control"
      {...(props as any)}
    >
      {typeof children === "function"
        ? children(renderState ?? ({} as RadioButtonRenderProps))
        : children}
    </dom.span>
  );
};

RadioControl.displayName = "HeroUI.Radio.Control";

/* -----------------------------------------------------------------------------------------------*/

interface RadioIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode | ((props: RadioButtonRenderProps) => ReactNode);
  className?: string;
}

const RadioIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: RadioIndicatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof RadioIndicatorProps<E>>) => {
  const {fieldState, slots} = useContext(RadioFieldContext);
  const {buttonState} = useContext(RadioButtonContext);
  const renderState = (buttonState ?? fieldState) as RadioButtonRenderProps | undefined;

  const content =
    typeof children === "function"
      ? children(renderState ?? ({} as RadioButtonRenderProps))
      : children;

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

RadioIndicator.displayName = "HeroUI.Radio.Indicator";

/* ----------------------------------------------------------------------------------------------*/

export {RadioRoot, RadioButtonRoot, RadioControl, RadioIndicator};
export {RadioButtonContext, RadioFieldIdContext} from "./radio-context";
export type {
  RadioRootProps,
  RadioButtonRootProps,
  RadioControlProps,
  RadioIndicatorProps,
  RadioFieldRenderProps,
  RadioButtonRenderProps,
};
