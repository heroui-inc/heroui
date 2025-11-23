"use client";

import type {FieldsetVariants} from "./fieldset.styles";
import type {ComponentPropsWithRef} from "react";

import {Slot} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";

import {fieldsetVariants} from "./fieldset.styles";

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
interface FieldsetRootProps extends ComponentPropsWithRef<"fieldset">, FieldsetVariants {
  asChild?: boolean;
}

const FieldsetRoot = ({asChild = false, className, ...props}: FieldsetRootProps) => {
  const Comp = asChild ? Slot : "fieldset";

  const slots = React.useMemo(() => fieldsetVariants({}), []);

  return (
    <FieldsetContext value={{slots}}>
      <Comp className={slots?.base({className})} data-slot="fieldset" {...props} />
    </FieldsetContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Fieldset Legend
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetLegendProps extends ComponentPropsWithRef<"legend"> {
  asChild?: boolean;
}

const FieldsetLegend = ({asChild = false, className, ...props}: FieldsetLegendProps) => {
  const Comp = asChild ? Slot : "legend";

  const {slots} = useContext(FieldsetContext);

  return <Comp className={slots?.legend({className})} data-slot="fieldset-legend" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Field Group
 * -----------------------------------------------------------------------------------------------*/
interface FieldGroupProps extends ComponentPropsWithRef<"div"> {
  asChild?: boolean;
}

const FieldGroup = ({asChild = false, className, ...rest}: FieldGroupProps) => {
  const Comp = asChild ? Slot : "div";

  const {slots} = useContext(FieldsetContext);

  return (
    <Comp className={slots?.fieldGroup({className})} data-slot="fieldset-field-group" {...rest} />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Field Actions
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetActionsProps extends ComponentPropsWithRef<"div"> {
  asChild?: boolean;
}

const FieldsetActions = ({asChild, children, className, ...rest}: FieldsetActionsProps) => {
  const Component = asChild ? Slot : "div";
  const {slots} = useContext(FieldsetContext);

  return (
    <Component className={slots?.actions({className})} data-slot="fieldset-actions" {...rest}>
      {children}
    </Component>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FieldsetRoot, FieldsetLegend, FieldGroup, FieldsetActions};

export type {FieldsetRootProps, FieldsetLegendProps, FieldGroupProps, FieldsetActionsProps};
