"use client";

import type {SwitchGroupVariants} from "./switch.styles";
import type {SwitchProps as SwitchPrimitiveProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {Switch as SwitchPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {switchGroupVariants, switchVariants} from "./switch.styles";

/* -------------------------------------------------------------------------------------------------
 * SwitchGroup Context
 * -----------------------------------------------------------------------------------------------*/

interface SwitchGroupContext {
  slots?: ReturnType<typeof switchGroupVariants>;
}

const SwitchGroupContext = createContext<SwitchGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * SwitchGroup
 * -----------------------------------------------------------------------------------------------*/

interface SwitchGroupRootProps extends React.HTMLAttributes<HTMLDivElement>, SwitchGroupVariants {}

const SwitchGroupRoot = React.forwardRef<HTMLDivElement, SwitchGroupRootProps>(
  ({children, className, orientation, ...props}, ref) => {
    const slots = React.useMemo(() => switchGroupVariants({orientation}), [orientation]);

    return (
      <SwitchGroupContext.Provider value={{slots}}>
        <div ref={ref} data-switch-group {...props} className={slots.base({className})}>
          {children}
        </div>
      </SwitchGroupContext.Provider>
    );
  },
);

SwitchGroupRoot.displayName = "HeroUI.SwitchGroup";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchGroupItemsProps extends React.HTMLAttributes<HTMLDivElement> {}

const SwitchGroupItems = React.forwardRef<HTMLDivElement, SwitchGroupItemsProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(SwitchGroupContext);

    return (
      <div ref={ref} data-switch-group-items className={slots?.items({className})} {...props} />
    );
  },
);

SwitchGroupItems.displayName = "HeroUI.SwitchGroup.Items";

/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/

interface SwitchContext {
  slots?: ReturnType<typeof switchVariants>;
}

const SwitchContext = createContext<SwitchContext>({});

interface SwitchRootProps extends SwitchPrimitiveProps {}

const SwitchRoot = React.forwardRef<React.ElementRef<typeof SwitchPrimitive>, SwitchRootProps>(
  ({children, className, ...props}, ref) => {
    const slots = React.useMemo(
      () => switchVariants({isDisabled: props.isDisabled}),
      [props.isDisabled],
    );

    return (
      <SwitchContext.Provider value={{slots}}>
        <SwitchPrimitive
          ref={ref}
          data-switch
          {...props}
          className={composeTwRenderProps(className, slots.base())}
        >
          {(values) => <>{typeof children === "function" ? children(values) : children}</>}
        </SwitchPrimitive>
      </SwitchContext.Provider>
    );
  },
);

SwitchRoot.displayName = "HeroUI.Switch";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchControlProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SwitchControl = React.forwardRef<HTMLSpanElement, SwitchControlProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(SwitchContext);

    return (
      <span ref={ref} data-switch-control className={slots?.control({className})} {...props}>
        <span data-switch-thumb className={slots?.thumb()} />
      </span>
    );
  },
);

SwitchControl.displayName = "HeroUI.Switch.Control";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SwitchLabel = React.forwardRef<HTMLSpanElement, SwitchLabelProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(SwitchContext);

    return <span ref={ref} data-switch-label className={slots?.label({className})} {...props} />;
  },
);

SwitchLabel.displayName = "HeroUI.Switch.Label";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundSwitch = Object.assign(SwitchRoot, {
  Control: SwitchControl,
  Label: SwitchLabel,
});

const CompoundSwitchGroup = Object.assign(SwitchGroupRoot, {
  Items: SwitchGroupItems,
});

export type {
  SwitchGroupRootProps,
  SwitchGroupRootProps as SwitchGroupProps,
  SwitchGroupItemsProps,
  SwitchRootProps,
  SwitchRootProps as SwitchProps,
  SwitchControlProps,
  SwitchLabelProps,
};

export {CompoundSwitch as Switch, CompoundSwitchGroup as SwitchGroup};
