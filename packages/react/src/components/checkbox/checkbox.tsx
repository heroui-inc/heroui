"use client";

import type {
  CheckboxProps as CheckboxPrimitiveProps,
  CheckboxRenderProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {Checkbox as CheckboxPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {checkboxVariants} from "./checkbox.styles";

interface CheckboxContext {
  slots?: ReturnType<typeof checkboxVariants>;
  state?: CheckboxRenderProps;
}

const CheckboxContext = createContext<CheckboxContext>({});

interface CheckboxRootProps extends CheckboxPrimitiveProps {
  /** The name of the checkbox, used when submitting an HTML form. */
  name?: string;
}

const CheckboxRoot = ({children, className, ...props}: CheckboxRootProps) => {
  const slots = React.useMemo(() => checkboxVariants(), []);

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

  const isIndeterminate = state?.isIndeterminate;

  const content =
    typeof children === "function"
      ? children(state ?? ({} as CheckboxRenderProps))
      : (children ?? (
          <svg aria-hidden="true" viewBox="0 0 18 18">
            {isIndeterminate ? (
              <rect height={3} width={15} x={1} y={7.5} />
            ) : (
              <polyline points="1 9 7 14 15 4" />
            )}
          </svg>
        ));

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
