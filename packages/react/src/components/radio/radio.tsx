"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {RadioButtonRenderProps, RadioFieldRenderProps} from "react-aria-components/RadioGroup";

import {radioVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  RadioButton as RadioButtonPrimitive,
  RadioField as RadioFieldPrimitive,
} from "react-aria-components/RadioGroup";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

interface RadioContext {
  slots?: ReturnType<typeof radioVariants>;
  state?: RadioFieldRenderProps;
}

const RadioContext = createContext<RadioContext>({});

/* -------------------------------------------------------------------------------------------------
 * Radio (Field) — React Aria `RadioField`.
 * -----------------------------------------------------------------------------------------------*/
interface RadioRootProps extends ComponentPropsWithRef<typeof RadioFieldPrimitive> {
  /** The name of the radio button, used when submitting an HTML form. */
  name?: string;
}

const RadioRoot = ({children, className, ...props}: RadioRootProps) => {
  const slots = React.useMemo(() => radioVariants(), []);

  return (
    <RadioFieldPrimitive
      data-slot="radio"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(state) => (
        <RadioContext value={{slots, state}}>
          {typeof children === "function" ? children(state) : children}
        </RadioContext>
      )}
    </RadioFieldPrimitive>
  );
};

RadioRoot.displayName = "HeroUI.Radio";

/* -------------------------------------------------------------------------------------------------
 * Radio.Content — the clickable `RadioButton` label wrapping the control + `Label`.
 * Keep `Description`/`FieldError` as siblings of `Radio.Content`.
 * -----------------------------------------------------------------------------------------------*/
interface RadioContentProps extends ComponentPropsWithRef<typeof RadioButtonPrimitive> {}

const RadioContent = ({children, className, ...props}: RadioContentProps) => {
  const {slots} = use(RadioContext);

  return (
    <RadioButtonPrimitive
      data-slot="radio-content"
      {...props}
      className={composeTwRenderProps(className, slots?.content())}
    >
      {children}
    </RadioButtonPrimitive>
  );
};

RadioContent.displayName = "HeroUI.Radio.Content";

/* -----------------------------------------------------------------------------------------------*/

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
  const {slots} = use(RadioContext);

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

RadioControl.displayName = "HeroUI.Radio.Control";

/* -----------------------------------------------------------------------------------------------*/

interface RadioIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode | ((props: RadioFieldRenderProps) => ReactNode);
  className?: string;
}

const RadioIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: RadioIndicatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof RadioIndicatorProps<E>>) => {
  const {slots, state} = use(RadioContext);

  const content =
    typeof children === "function" ? children(state ?? ({} as RadioFieldRenderProps)) : children;

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

export {RadioRoot, RadioContent, RadioControl, RadioIndicator};
export type {
  RadioRootProps,
  RadioContentProps,
  RadioControlProps,
  RadioIndicatorProps,
  RadioFieldRenderProps,
  RadioButtonRenderProps,
};
