"use client";

import type {DisclosureGroupVariants} from "./disclosure-group.styles";
import type {ComponentPropsWithRef} from "react";

import React, {createContext} from "react";
import {DisclosureGroup as DisclosureGroupPrimitive} from "react-aria-components";

import {mapPropsVariants, objectToDeps} from "../../utils";
import {composeTwRenderProps} from "../../utils/compose";

import {disclosureGroupVariants} from "./disclosure-group.styles";

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

const DisclosureGroupRoot = ({children, className, ...originalProps}: DisclosureGroupRootProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    disclosureGroupVariants.variantKeys,
  );

  const slots = React.useMemo(
    () => disclosureGroupVariants({...(variantProps as DisclosureGroupVariants)}),
    [objectToDeps(variantProps)],
  );

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
