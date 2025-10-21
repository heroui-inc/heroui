"use client";

import type {DisclosureGroupVariants} from "./disclosure-group.styles";
import type {DisclosureGroupProps as DisclosureGroupPrimitiveProps} from "react-aria-components";

import React, {createContext} from "react";
import {DisclosureGroup as DisclosureGroupPrimitive} from "react-aria-components";

import {mapPropsVariants, objectToDeps} from "../../utils";
import {composeTwRenderProps} from "../../utils/compose";

import {disclosureGroupVariants} from "./disclosure-group.styles";

const DisclosureGroupContext = createContext<{
  slots?: ReturnType<typeof disclosureGroupVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * DisclosureGroup
 * -----------------------------------------------------------------------------------------------*/

interface DisclosureGroupProps extends DisclosureGroupPrimitiveProps, DisclosureGroupVariants {}

const DisclosureGroup = ({children, className, ...originalProps}: DisclosureGroupProps) => {
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

export type {DisclosureGroupProps};
export {DisclosureGroup};
