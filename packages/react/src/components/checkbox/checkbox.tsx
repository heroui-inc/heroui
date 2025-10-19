"use client";

import type {
  CheckboxGroupProps as CheckboxGroupPrimitiveProps,
  CheckboxProps as CheckboxPrimitiveProps,
  CheckboxRenderProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  Checkbox as CheckboxPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {checkboxGroupVariants, checkboxVariants} from "./checkbox.styles";

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxGroupRootProps extends CheckboxGroupPrimitiveProps {}

const CheckboxGroup = React.forwardRef<
  React.ElementRef<typeof CheckboxGroupPrimitive>,
  CheckboxGroupRootProps
>(({children, className, ...props}, ref) => {
  const styles = React.useMemo(() => checkboxGroupVariants(), []);

  return (
    <CheckboxGroupPrimitive
      ref={ref}
      data-slot="checkbox-group"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </CheckboxGroupPrimitive>
  );
});

CheckboxGroup.displayName = "HeroUI.CheckboxGroup";

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxContext {
  slots?: ReturnType<typeof checkboxVariants>;
  state?: CheckboxRenderProps;
}

const CheckboxContext = createContext<CheckboxContext>({});

interface CheckboxRootProps extends CheckboxPrimitiveProps {
  /** The name of the checkbox, used when submitting an HTML form. */
  name?: string;
}

const CheckboxRoot = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive>,
  CheckboxRootProps
>(({children, className, ...props}, ref) => {
  const slots = React.useMemo(() => checkboxVariants(), []);

  return (
    <CheckboxPrimitive
      ref={ref}
      data-slot="checkbox"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <CheckboxContext.Provider value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </CheckboxContext.Provider>
      )}
    </CheckboxPrimitive>
  );
});

CheckboxRoot.displayName = "HeroUI.Checkbox";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxControlProps extends React.HTMLAttributes<HTMLSpanElement> {}

const CheckboxControl = React.forwardRef<HTMLSpanElement, CheckboxControlProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(CheckboxContext);

    return (
      <span
        ref={ref}
        className={slots?.control({className})}
        data-slot="checkbox-control"
        {...props}
      >
        {children}
      </span>
    );
  },
);

CheckboxControl.displayName = "HeroUI.Checkbox.Control";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode | ((props: CheckboxRenderProps) => React.ReactNode);
}

const CheckboxIndicator = React.forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  ({children, className, ...props}, ref) => {
    const {slots, state} = useContext(CheckboxContext);

    const content =
      typeof children === "function" ? children(state ?? ({} as CheckboxRenderProps)) : children;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={slots?.indicator({className})}
        data-slot="checkbox-indicator"
        {...props}
      >
        {content}
      </span>
    );
  },
);

CheckboxIndicator.displayName = "HeroUI.Checkbox.Indicator";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CheckboxContent = React.forwardRef<HTMLDivElement, CheckboxContentProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(CheckboxContext);

    return (
      <div
        ref={ref}
        className={slots?.content({className})}
        data-slot="checkbox-content"
        {...props}
      >
        {children}
      </div>
    );
  },
);

CheckboxContent.displayName = "HeroUI.Checkbox.Content";

/* ----------------------------------------------------------------------------------------------*/

const CompoundCheckbox = Object.assign(CheckboxRoot, {
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Content: CheckboxContent,
});

export type {
  CheckboxGroupRootProps,
  CheckboxGroupRootProps as CheckboxGroupProps,
  CheckboxRootProps,
  CheckboxRootProps as CheckboxProps,
  CheckboxIndicatorProps,
};

export {CompoundCheckbox as Checkbox, CheckboxGroup};
