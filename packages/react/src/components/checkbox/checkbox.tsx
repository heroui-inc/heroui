"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {CheckboxVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {
  CheckboxButtonRenderProps,
  CheckboxFieldRenderProps,
} from "react-aria-components/Checkbox";

import {checkboxVariants} from "@heroui/styles";
import React, {createContext, useContext, useId} from "react";
import {
  CheckboxButton as CheckboxButtonPrimitive,
  CheckboxField as CheckboxFieldPrimitive,
} from "react-aria-components/Checkbox";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CheckboxGroupContext} from "../checkbox-group/checkbox-group";

import {CheckboxButtonContext, CheckboxFieldIdContext} from "./checkbox-context";

interface CheckboxFieldContextValue {
  slots?: ReturnType<typeof checkboxVariants>;
  fieldState?: CheckboxFieldRenderProps;
}

const CheckboxFieldContext = createContext<CheckboxFieldContextValue>({});

/* -------------------------------------------------------------------------------------------------
 * Checkbox (Field) — React Aria `CheckboxField`. RSC-safe: it does not inspect children.
 * -----------------------------------------------------------------------------------------------*/
interface CheckboxRootProps
  extends ComponentPropsWithRef<typeof CheckboxFieldPrimitive>, CheckboxVariants {
  /** The name of the checkbox, used when submitting an HTML form. */
  name?: string;
}

const CheckboxRoot = ({children, className, id, variant, ...props}: CheckboxRootProps) => {
  const checkboxGroupContext = useContext(CheckboxGroupContext);
  const effectiveVariant = variant ?? checkboxGroupContext.variant;
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const slots = React.useMemo(
    () => checkboxVariants({variant: effectiveVariant}),
    [effectiveVariant],
  );

  return (
    <CheckboxFieldPrimitive
      data-slot="checkbox"
      id={inputId}
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(fieldState) => (
        <CheckboxFieldIdContext value={{inputId}}>
          <CheckboxFieldContext value={{slots, fieldState}}>
            {typeof children === "function" ? children(fieldState) : children}
          </CheckboxFieldContext>
        </CheckboxFieldIdContext>
      )}
    </CheckboxFieldPrimitive>
  );
};

CheckboxRoot.displayName = "HeroUI.Checkbox";

/* -------------------------------------------------------------------------------------------------
 * Checkbox.Button — clickable `CheckboxButton` label wrapping the control + `Label`.
 * Keep `Description`/`FieldError` as siblings of `Checkbox.Button`.
 * -----------------------------------------------------------------------------------------------*/
interface CheckboxButtonRootProps extends ComponentPropsWithRef<typeof CheckboxButtonPrimitive> {}

const CheckboxButtonRoot = ({children, className, ...props}: CheckboxButtonRootProps) => {
  const {slots} = useContext(CheckboxFieldContext);

  return (
    <CheckboxButtonPrimitive
      data-slot="checkbox-button"
      {...props}
      className={composeTwRenderProps(className, slots?.button())}
    >
      {(buttonState) => (
        <CheckboxButtonContext value={{buttonState, isInsideCheckboxButton: true}}>
          {typeof children === "function" ? children(buttonState) : children}
        </CheckboxButtonContext>
      )}
    </CheckboxButtonPrimitive>
  );
};

CheckboxButtonRoot.displayName = "HeroUI.Checkbox.Button";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxControlProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode | ((props: CheckboxButtonRenderProps) => ReactNode);
  className?: string;
}

const CheckboxControl = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: CheckboxControlProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CheckboxControlProps<E>>) => {
  const {fieldState, slots} = useContext(CheckboxFieldContext);
  const {buttonState, isInsideCheckboxButton} = useContext(CheckboxButtonContext);
  const renderState = (buttonState ?? fieldState) as CheckboxButtonRenderProps | undefined;

  const control = (
    <dom.span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="checkbox-control"
      {...(props as any)}
    >
      {typeof children === "function"
        ? children(renderState ?? ({} as CheckboxButtonRenderProps))
        : children}
    </dom.span>
  );

  if (isInsideCheckboxButton) {
    return control;
  }

  // Control-only: self-wrap so the control is the clickable target (RSC-safe).
  return (
    <CheckboxButtonPrimitive className={slots?.button()} data-slot="checkbox-button">
      {(state) => (
        <CheckboxButtonContext value={{buttonState: state, isInsideCheckboxButton: true}}>
          {control}
        </CheckboxButtonContext>
      )}
    </CheckboxButtonPrimitive>
  );
};

CheckboxControl.displayName = "HeroUI.Checkbox.Control";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode | ((props: CheckboxButtonRenderProps) => ReactNode);
  className?: string;
}

const CheckboxIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: CheckboxIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CheckboxIndicatorProps<E>>) => {
  const {fieldState, slots} = useContext(CheckboxFieldContext);
  const {buttonState} = useContext(CheckboxButtonContext);
  const renderState = (buttonState ?? fieldState) as CheckboxButtonRenderProps | undefined;

  const isSelected = renderState?.isSelected;
  const isIndeterminate = renderState?.isIndeterminate;

  const content =
    typeof children === "function" ? (
      children(renderState ?? ({} as CheckboxButtonRenderProps))
    ) : children ? (
      children
    ) : isIndeterminate ? (
      <svg
        aria-hidden="true"
        data-slot="checkbox-default-indicator--indeterminate"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <line x1="21" x2="3" y1="12" y2="12" />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        data-slot="checkbox-default-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeDasharray={22}
        strokeDashoffset={isSelected ? 44 : 66}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    );

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="checkbox-indicator"
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

CheckboxIndicator.displayName = "HeroUI.Checkbox.Indicator";

/* ----------------------------------------------------------------------------------------------*/

export {CheckboxRoot, CheckboxButtonRoot, CheckboxControl, CheckboxIndicator};
export {CheckboxButtonContext, CheckboxFieldIdContext} from "./checkbox-context";
export type {
  CheckboxRootProps,
  CheckboxButtonRootProps,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxFieldRenderProps,
  CheckboxButtonRenderProps,
};
