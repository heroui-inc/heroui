"use client";

import type {ComponentPropsWithRef} from "react";

import {Header as HeaderPrimitive} from "react-aria-components";

import {headerVariants} from "./header.styles";

/* -------------------------------------------------------------------------------------------------
 * Header Root
 * -----------------------------------------------------------------------------------------------*/
interface HeaderRootProps extends ComponentPropsWithRef<typeof HeaderPrimitive> {}

const HeaderRoot = ({children, className, ...rest}: HeaderRootProps) => {
  return (
    <HeaderPrimitive className={headerVariants({className})} data-slot="header" {...rest}>
      {children}
    </HeaderPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {HeaderRoot};

export type {HeaderRootProps};
