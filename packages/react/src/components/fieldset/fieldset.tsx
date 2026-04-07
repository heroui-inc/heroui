"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {fieldsetVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

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
interface FieldsetRootProps<
  E extends keyof React.JSX.IntrinsicElements = "fieldset",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const FieldsetRoot = <E extends keyof React.JSX.IntrinsicElements = "fieldset">({
  className,
  ...props
}: FieldsetRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetRootProps<E>>) => {
  const slots = React.useMemo(() => fieldsetVariants({}), []);

  return (
    <FieldsetContext value={{slots}}>
      <dom.fieldset className={slots?.base({className})} data-slot="fieldset" {...(props as any)} />
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
