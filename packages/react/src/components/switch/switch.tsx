"use client";

import type {SwitchVariants} from "./switch.styles.js";
import type {SwitchProps as SwitchPrimitiveProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {Switch as SwitchPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose.js";
import {mapPropsVariants, objectToDeps} from "../../utils/index.js";

import {switchVariants} from "./switch.styles.js";

/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/
interface SwitchContext {
  slots?: ReturnType<typeof switchVariants>;
}
const SwitchContext = createContext<SwitchContext>({});

interface SwitchRootProps extends SwitchPrimitiveProps, SwitchVariants {}

const SwitchRoot = ({children, className, ...originalProps}: SwitchRootProps) => {
  const [props, variantProps] = mapPropsVariants(originalProps, switchVariants.variantKeys);
  const slots = React.useMemo(
    () => switchVariants({...(variantProps as SwitchVariants)}),
    [objectToDeps(variantProps)],
  );

  return (
    <SwitchContext value={{slots}}>
      <SwitchPrimitive
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
interface SwitchControlProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SwitchControl = ({children, className, ...props}: SwitchControlProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span className={slots?.control({className})} data-slot="switch-control" {...props}>
      {children}
    </span>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface SwitchThumbProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SwitchThumb = ({children, className, ...props}: SwitchThumbProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span className={slots?.thumb({className})} data-slot="switch-thumb" {...props}>
      {children}
    </span>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface SwitchIconProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SwitchIcon = ({children, className, ...props}: SwitchIconProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span className={slots?.icon({className})} data-slot="switch-icon" {...props}>
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SwitchRoot, SwitchControl, SwitchThumb, SwitchIcon};
export type {SwitchRootProps, SwitchControlProps, SwitchThumbProps, SwitchIconProps};
