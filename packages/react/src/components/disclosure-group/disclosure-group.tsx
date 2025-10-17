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

const DisclosureGroup = React.forwardRef<
  React.ComponentRef<typeof DisclosureGroupPrimitive>,
  DisclosureGroupProps
>(({children, className, ...originalProps}, ref) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    disclosureGroupVariants.variantKeys,
  );

  const slots = React.useMemo(
    () => disclosureGroupVariants({...(variantProps as DisclosureGroupVariants)}),
    [objectToDeps(variantProps)],
  );

  return (
    <DisclosureGroupContext.Provider value={{slots}}>
      <DisclosureGroupPrimitive
        ref={ref}
        data-slot="disclosure-group"
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </DisclosureGroupPrimitive>
    </DisclosureGroupContext.Provider>
  );
});

DisclosureGroup.displayName = "HeroUI.DisclosureGroup";

export type {DisclosureGroupProps};
export default DisclosureGroup;
