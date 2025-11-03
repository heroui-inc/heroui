"use client";

import type {CheckboxVariants} from "./checkbox.styles";
import type {
  CheckboxProps as CheckboxPrimitiveProps,
  CheckboxRenderProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {Checkbox as CheckboxPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

import {checkboxVariants} from "./checkbox.styles";

interface CheckboxContext {
  slots?: ReturnType<typeof checkboxVariants>;
  state?: CheckboxRenderProps;
}

const CheckboxContext = createContext<CheckboxContext>({});

interface CheckboxRootProps extends CheckboxPrimitiveProps, CheckboxVariants {
  /** The name of the checkbox, used when submitting an HTML form. */
  name?: string;
}

const CheckboxRoot = ({children, className, isOnSurface, ...props}: CheckboxRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);
  const slots = React.useMemo(
    () => checkboxVariants({isOnSurface: isOnSurfaceValue}),
    [isOnSurfaceValue],
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

interface CheckboxControlProps extends React.HTMLAttributes<HTMLSpanElement> {}

const CheckboxControl = ({children, className, ...props}: CheckboxControlProps) => {
  const {slots} = useContext(CheckboxContext);

  return (
    <span className={slots?.control({className})} data-slot="checkbox-control" {...props}>
      {children}
    </span>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode | ((props: CheckboxRenderProps) => React.ReactNode);
}

const CheckboxIndicator = ({children, className, ...props}: CheckboxIndicatorProps) => {
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
    <span
      aria-hidden="true"
      className={slots?.indicator({className})}
      data-slot="checkbox-indicator"
      {...props}
    >
      {content}
    </span>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CheckboxContent = ({children, className, ...props}: CheckboxContentProps) => {
  const {slots} = useContext(CheckboxContext);

  return (
    <div className={slots?.content({className})} data-slot="checkbox-content" {...props}>
      {children}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------*/

export {CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxContent};
export type {CheckboxRootProps, CheckboxControlProps, CheckboxIndicatorProps, CheckboxContentProps};
