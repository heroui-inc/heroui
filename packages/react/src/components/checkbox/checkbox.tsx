"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {CheckboxVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {CheckboxRenderProps} from "react-aria-components/Checkbox";

import {checkboxVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Checkbox as CheckboxPrimitive} from "react-aria-components/Checkbox";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CheckboxGroupContext} from "../checkbox-group/checkbox-group";

interface CheckboxContext {
  slots?: ReturnType<typeof checkboxVariants>;
  state?: CheckboxRenderProps;
}

const CheckboxContext = createContext<CheckboxContext>({});

interface CheckboxRootProps
  extends ComponentPropsWithRef<typeof CheckboxPrimitive>, CheckboxVariants {
  /** The name of the checkbox, used when submitting an HTML form. */
  name?: string;
}

const CheckboxRoot = ({children, className, variant, ...props}: CheckboxRootProps) => {
  const checkboxGroupContext = useContext(CheckboxGroupContext);
  const effectiveVariant = variant ?? checkboxGroupContext.variant;
  const slots = React.useMemo(
    () => checkboxVariants({variant: effectiveVariant}),
    [effectiveVariant],
  );

  return (
    <CheckboxPrimitive
      data-slot="checkbox"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <CheckboxContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </CheckboxContext>
      )}
    </CheckboxPrimitive>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxControlProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const CheckboxControl = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: CheckboxControlProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CheckboxControlProps<E>>) => {
  const {slots} = useContext(CheckboxContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="checkbox-control"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode | ((props: CheckboxRenderProps) => ReactNode);
  className?: string;
}

const CheckboxIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: CheckboxIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CheckboxIndicatorProps<E>>) => {
  const {slots, state} = useContext(CheckboxContext);

  const isSelected = state?.isSelected;

  const isIndeterminate = state?.isIndeterminate;

  const content =
    typeof children === "function" ? (
      children(state ?? ({} as CheckboxRenderProps))
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

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const CheckboxContent = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: CheckboxContentProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CheckboxContentProps<E>>) => {
  const {slots} = useContext(CheckboxContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.content, className)}
      data-slot="checkbox-content"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

/* ----------------------------------------------------------------------------------------------*/

export {CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxContent};
export type {CheckboxRootProps, CheckboxControlProps, CheckboxIndicatorProps, CheckboxContentProps};
