"use client";

import type {DisclosureGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {disclosureGroupVariants} from "@heroui/styles";
import React, {createContext, memo, useMemo} from "react";
import {DisclosureGroup as DisclosureGroupPrimitive} from "react-aria-components/DisclosureGroup";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Disclosure Group Context
 * -----------------------------------------------------------------------------------------------*/
type DisclosureGroupContext = Record<string, never>;

const DisclosureGroupContext = createContext<DisclosureGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Group Root
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureGroupRootProps
  extends ComponentPropsWithRef<typeof DisclosureGroupPrimitive>, DisclosureGroupVariants {}

const DisclosureGroupRoot = memo(function DisclosureGroupRoot({
  children,
  className,
  ...props
}: DisclosureGroupRootProps) {
  const slots = useMemo(() => disclosureGroupVariants({}), []);
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <DisclosureGroupContext value={{}}>
      <DisclosureGroupPrimitive
        data-slot="disclosure-group"
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </DisclosureGroupPrimitive>
    </DisclosureGroupContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DisclosureGroupRoot};

export type {DisclosureGroupRootProps};
