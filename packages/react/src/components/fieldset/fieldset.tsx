"use client";

import type {FieldsetVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {fieldsetVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";

import {composeSlotClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Fieldset Context
 * -----------------------------------------------------------------------------------------------*/
type FieldsetContext = {
  slots?: ReturnType<typeof fieldsetVariants>;
};

const FieldsetContext = createContext<FieldsetContext>({});

/* -------------------------------------------------------------------------------------------------
 * Fieldset Root
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetRootProps extends ComponentPropsWithRef<"fieldset">, FieldsetVariants {}

const FieldsetRoot = ({className, ...props}: FieldsetRootProps) => {
  const slots = React.useMemo(() => fieldsetVariants({}), []);

  return (
    <FieldsetContext value={{slots}}>
      <fieldset className={slots?.base({className})} data-slot="fieldset" {...props} />
    </FieldsetContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Fieldset Legend
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetLegendProps extends ComponentPropsWithRef<"legend"> {}

const FieldsetLegend = ({className, ...props}: FieldsetLegendProps) => {
  const {slots} = useContext(FieldsetContext);

  return (
    <legend
      className={composeSlotClassName(slots?.legend, className)}
      data-slot="fieldset-legend"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Field Group
 * -----------------------------------------------------------------------------------------------*/
interface FieldGroupProps extends ComponentPropsWithRef<"div"> {}

const FieldGroup = ({className, ...rest}: FieldGroupProps) => {
  const {slots} = useContext(FieldsetContext);

  return (
    <div
      className={composeSlotClassName(slots?.fieldGroup, className)}
      data-slot="fieldset-field-group"
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Field Actions
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetActionsProps extends ComponentPropsWithRef<"div"> {}

const FieldsetActions = ({children, className, ...rest}: FieldsetActionsProps) => {
  const {slots} = useContext(FieldsetContext);

  return (
    <div
      className={composeSlotClassName(slots?.actions, className)}
      data-slot="fieldset-actions"
      {...rest}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FieldsetRoot, FieldsetLegend, FieldGroup, FieldsetActions};

export type {FieldsetRootProps, FieldsetLegendProps, FieldGroupProps, FieldsetActionsProps};
