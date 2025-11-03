"use client";

import type {ComponentProps} from "react";

import {Header as HeaderPrimitive} from "react-aria-components";

import {headerVariants} from "./header.styles";

/* -------------------------------------------------------------------------------------------------
 * Header Root
 * -----------------------------------------------------------------------------------------------*/
interface HeaderRootProps extends ComponentProps<typeof HeaderPrimitive> {}

const HeaderRoot = ({children, className, ...rest}: HeaderRootProps) => {
  return (
    <HeaderPrimitive className={headerVariants({className})} {...rest}>
      {children}
    </HeaderPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {HeaderRoot};

export type {HeaderRootProps};
