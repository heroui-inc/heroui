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
interface SwitchGroupProps extends React.HTMLAttributes<HTMLDivElement>, SwitchGroupVariants {
  ref?: React.Ref<HTMLDivElement>;
}
const SwitchGroup = ({children, className, orientation, ref, ...props}: SwitchGroupProps) => {
  const slots = React.useMemo(() => switchGroupVariants({orientation}), [orientation]);

  return (
    <SwitchGroupContext value={{slots}}>
      <div ref={ref} data-slot="switch-group" {...props} className={slots.base({className})}>
        {children}
      </div>
    </SwitchGroupContext>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface SwitchGroupItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
const SwitchGroupItems = ({className, ref, ...props}: SwitchGroupItemsProps) => {
  const {slots} = useContext(SwitchGroupContext);

  return (
    <div
      ref={ref}
      className={slots?.items({className})}
      data-slot="switch-group-items"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/
interface SwitchContext {
  slots?: ReturnType<typeof switchVariants>;
}
const SwitchContext = createContext<SwitchContext>({});

interface SwitchProps extends SwitchPrimitiveProps, SwitchVariants {
  ref?: React.Ref<HTMLLabelElement>;
}
const Switch = ({children, className, ref, ...originalProps}: SwitchProps) => {
  const [props, variantProps] = mapPropsVariants(originalProps, switchVariants.variantKeys);
  const slots = React.useMemo(
    () => switchVariants({...(variantProps as SwitchVariants)}),
    [objectToDeps(variantProps)],
  );

  return (
    <SwitchContext value={{slots}}>
      <SwitchPrimitive
        ref={ref}
        data-slot="switch"
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SwitchPrimitive>
    </SwitchContext>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface SwitchControlProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>;
}
const SwitchControl = ({children, className, ref, ...props}: SwitchControlProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span ref={ref} className={slots?.control({className})} data-slot="switch-control" {...props}>
      {children}
    </span>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface SwitchThumbProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>;
}
const SwitchThumb = ({children, className, ref, ...props}: SwitchThumbProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span ref={ref} className={slots?.thumb({className})} data-slot="switch-thumb" {...props}>
      {children}
    </span>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface SwitchIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>;
}
const SwitchIcon = ({children, className, ref, ...props}: SwitchIconProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span ref={ref} className={slots?.icon({className})} data-slot="switch-icon" {...props}>
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SwitchGroup, SwitchGroupItems, Switch, SwitchControl, SwitchThumb, SwitchIcon};
export type {
  SwitchGroupProps,
  SwitchGroupItemsProps,
  SwitchProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchIconProps,
};
