"use client";

import type {SwitchVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {switchVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Switch as SwitchPrimitive} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Switch Context
 * -----------------------------------------------------------------------------------------------*/
interface SwitchContext {
  slots?: ReturnType<typeof switchVariants>;
}

const SwitchContext = createContext<SwitchContext>({});

/* -------------------------------------------------------------------------------------------------
 * Switch Root
 * -----------------------------------------------------------------------------------------------*/
interface SwitchRootProps extends ComponentPropsWithRef<typeof SwitchPrimitive>, SwitchVariants {}

const SwitchRoot = ({children, className, size, ...props}: SwitchRootProps) => {
  const slots = React.useMemo(() => switchVariants({size}), [size]);

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

/* -------------------------------------------------------------------------------------------------
 * Switch Control
 * -----------------------------------------------------------------------------------------------*/
interface SwitchControlProps extends ComponentPropsWithRef<"span"> {}

const SwitchControl = ({children, className, ...props}: SwitchControlProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="switch-control"
      {...props}
    >
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Switch Thumb
 * -----------------------------------------------------------------------------------------------*/
interface SwitchThumbProps extends ComponentPropsWithRef<"span"> {}

const SwitchThumb = ({children, className, ...props}: SwitchThumbProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span
      className={composeSlotClassName(slots?.thumb, className)}
      data-slot="switch-thumb"
      {...props}
    >
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Switch Icon
 * -----------------------------------------------------------------------------------------------*/
interface SwitchIconProps extends ComponentPropsWithRef<"span"> {}

const SwitchIcon = ({children, className, ...props}: SwitchIconProps) => {
  const {slots} = useContext(SwitchContext);

  return (
    <span
      className={composeSlotClassName(slots?.icon, className)}
      data-slot="switch-icon"
      {...props}
    >
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SwitchRoot, SwitchControl, SwitchThumb, SwitchIcon};

export type {SwitchRootProps, SwitchControlProps, SwitchThumbProps, SwitchIconProps};
