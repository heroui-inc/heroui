"use client";

import type {ComponentPropsWithRef} from "react";

import {headerVariants} from "@heroui/styles";
import {Header as HeaderPrimitive} from "react-aria-components";

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
