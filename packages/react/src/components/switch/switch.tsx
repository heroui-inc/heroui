"use client";

import type {SwitchGroupVariants, SwitchVariants} from "./switch.styles";
import type {SwitchProps as SwitchPrimitiveProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {Switch as SwitchPrimitive} from "react-aria-components";

import {mapPropsVariants, objectToDeps} from "../../utils";
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
        <div ref={ref} data-slot="switch-group" {...props} className={slots.base({className})}>
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
      <div
        ref={ref}
        className={slots?.items({className})}
        data-slot="switch-group-items"
        {...props}
      />
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

interface SwitchRootProps extends SwitchPrimitiveProps, SwitchVariants {}

const SwitchRoot = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive>, SwitchRootProps>(
  ({children, className, ...originalProps}, ref) => {
    const [props, variantProps] = mapPropsVariants(originalProps, switchVariants.variantKeys);
    const slots = React.useMemo(
      () => switchVariants({...(variantProps as SwitchVariants)}),
      [objectToDeps(variantProps)],
    );

    return (
      <SwitchContext.Provider value={{slots}}>
        <SwitchPrimitive
          ref={ref}
          data-slot="switch"
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
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(SwitchContext);

    return (
      <span ref={ref} className={slots?.control({className})} data-slot="switch-control" {...props}>
        {children}
      </span>
    );
  },
);

SwitchControl.displayName = "HeroUI.Switch.Control";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchThumbProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SwitchThumb = React.forwardRef<HTMLSpanElement, SwitchThumbProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(SwitchContext);

    return (
      <span ref={ref} className={slots?.thumb({className})} data-slot="switch-thumb" {...props}>
        {children}
      </span>
    );
  },
);

SwitchThumb.displayName = "HeroUI.Switch.Thumb";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchIconProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SwitchIcon = React.forwardRef<any, SwitchIconProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(SwitchContext);

    return (
      <span ref={ref} className={slots?.icon({className})} data-slot="switch-icon" {...props}>
        {children}
      </span>
    );
  },
);

SwitchIcon.displayName = "HeroUI.Switch.Icon";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundSwitch = Object.assign(SwitchRoot, {
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Icon: SwitchIcon,
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
  SwitchThumbProps,
  SwitchIconProps,
};

export {CompoundSwitch as Switch, CompoundSwitchGroup as SwitchGroup};
