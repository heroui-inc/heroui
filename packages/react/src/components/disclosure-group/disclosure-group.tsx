"use client";

import type {DisclosureGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {disclosureGroupVariants} from "@heroui/styles";
import React, {createContext} from "react";
import {DisclosureGroup as DisclosureGroupPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Disclosure Group Context
 * -----------------------------------------------------------------------------------------------*/
type DisclosureGroupContext = {
  slots?: ReturnType<typeof disclosureGroupVariants>;
};

const DisclosureGroupContext = createContext<DisclosureGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Group Root
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureGroupRootProps
  extends ComponentPropsWithRef<typeof DisclosureGroupPrimitive>, DisclosureGroupVariants {}

const DisclosureGroupRoot = ({children, className, ...props}: DisclosureGroupRootProps) => {
  const slots = React.useMemo(() => disclosureGroupVariants({}), []);

  return (
    <DisclosureGroupContext value={{slots}}>
      <DisclosureGroupPrimitive
        data-slot="disclosure-group"
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </DisclosureGroupPrimitive>
    </DisclosureGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DisclosureGroupRoot};

export type {DisclosureGroupRootProps};
