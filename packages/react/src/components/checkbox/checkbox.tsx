"use client";

import type {CheckboxGroupVariants} from "./checkbox.styles";
import type {
  CheckboxGroupProps as CheckboxGroupPrimitiveProps,
  CheckboxProps as CheckboxPrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  Checkbox as CheckboxPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {checkboxGroupVariants, checkboxVariants} from "./checkbox.styles";

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup Context
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxGroupContext {
  slots?: ReturnType<typeof checkboxGroupVariants>;
}

const CheckboxGroupContext = createContext<CheckboxGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxGroupRootProps extends CheckboxGroupPrimitiveProps, CheckboxGroupVariants {}

const CheckboxGroupRoot = React.forwardRef<
  React.ElementRef<typeof CheckboxGroupPrimitive>,
  CheckboxGroupRootProps
>(({children, className, orientation, ...props}, ref) => {
  const slots = React.useMemo(() => checkboxGroupVariants({orientation}), [orientation]);

  return (
    <CheckboxGroupContext.Provider value={{slots}}>
      <CheckboxGroupPrimitive
        ref={ref}
        data-checkbox-group
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </CheckboxGroupPrimitive>
    </CheckboxGroupContext.Provider>
  );
});

CheckboxGroupRoot.displayName = "HeroUI.CheckboxGroup";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxGroupItemsProps extends React.HTMLAttributes<HTMLDivElement> {}

const CheckboxGroupItems = React.forwardRef<HTMLDivElement, CheckboxGroupItemsProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(CheckboxGroupContext);

    return (
      <div ref={ref} data-checkbox-group-items className={slots?.items({className})} {...props} />
    );
  },
);

CheckboxGroupItems.displayName = "HeroUI.CheckboxGroup.Items";

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxContext {
  slots?: ReturnType<typeof checkboxVariants>;
  isSelected?: boolean;
  isIndeterminate?: boolean;
}

const CheckboxContext = createContext<CheckboxContext>({});

interface CheckboxRootProps extends CheckboxPrimitiveProps {}

const CheckboxRoot = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive>,
  CheckboxRootProps
>(({children, className, ...props}, ref) => {
  const slots = React.useMemo(
    () => checkboxVariants({isDisabled: props.isDisabled}),
    [props.isDisabled],
  );

  return (
    <CheckboxPrimitive
      ref={ref}
      data-checkbox
      data-slot="control"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <CheckboxContext.Provider
          value={{isIndeterminate: values.isIndeterminate, isSelected: values.isSelected, slots}}
        >
          {typeof children === "function" ? children(values) : children}
        </CheckboxContext.Provider>
      )}
    </CheckboxPrimitive>
  );
});

CheckboxRoot.displayName = "HeroUI.Checkbox";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode | ((isIndeterminate: boolean) => React.ReactNode);
}

const CheckboxIndicator = React.forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  ({children, className, ...props}, ref) => {
    const {isIndeterminate, isSelected, slots} = useContext(CheckboxContext);

    const renderIcon = () => {
      if (!isSelected && !isIndeterminate) {
        return null;
      }

      if (typeof children === "function") {
        return children(isIndeterminate || false);
      }
      if (children) {
        return children;
      }
      if (isIndeterminate) {
        return <CheckboxIndeterminateIcon />;
      }

      return <CheckboxDefaultIcon />;
    };

    return (
      <span ref={ref} data-checkbox-wrapper className={slots?.wrapper({className})} {...props}>
        <span data-checkbox-icon className={slots?.icon()}>
          {renderIcon()}
        </span>
      </span>
    );
  },
);

CheckboxIndicator.displayName = "HeroUI.Checkbox.Indicator";

/* -----------------------------------------------------------------------------------------------*/

const CheckboxDefaultIcon = () => (
  <svg fill="none" height="12" viewBox="0 0 16 16" width="12">
    <path
      clipRule="evenodd"
      d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const CheckboxIndeterminateIcon = () => (
  <svg fill="none" height="12" viewBox="0 0 16 16" width="12">
    <path
      clipRule="evenodd"
      d="M1.75 8a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11A.75.75 0 0 1 1.75 8"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundCheckbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator,
  Icon: CheckboxDefaultIcon,
  IndeterminateIcon: CheckboxIndeterminateIcon,
});

const CompoundCheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Items: CheckboxGroupItems,
});

export {CompoundCheckbox as Checkbox, CompoundCheckboxGroup as CheckboxGroup};

export type {
  CheckboxGroupRootProps as CheckboxGroupProps,
  CheckboxGroupItemsProps,
  CheckboxRootProps as CheckboxProps,
  CheckboxIndicatorProps,
};
