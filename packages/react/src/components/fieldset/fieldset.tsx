"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ReactNode} from "react";

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
interface FieldsetLegendProps<
  E extends keyof React.JSX.IntrinsicElements = "legend",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const FieldsetLegend = <E extends keyof React.JSX.IntrinsicElements = "legend">({
  className,
  ...props
}: FieldsetLegendProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetLegendProps<E>>) => {
  const {slots} = useContext(FieldsetContext);

  return (
    <dom.legend
      className={composeSlotClassName(slots?.legend, className)}
      data-slot="fieldset-legend"
      {...(props as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Field Group
 * -----------------------------------------------------------------------------------------------*/
interface FieldGroupProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const FieldGroup = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...rest
}: FieldGroupProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldGroupProps<E>>) => {
  const {slots} = useContext(FieldsetContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.fieldGroup, className)}
      data-slot="fieldset-field-group"
      {...(rest as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Field Actions
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetActionsProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const FieldsetActions = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: FieldsetActionsProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof FieldsetActionsProps<E>>) => {
  const {slots} = useContext(FieldsetContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.actions, className)}
      data-slot="fieldset-actions"
      {...(rest as any)}
    >
      {children}
    </dom.div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FieldsetRoot, FieldsetLegend, FieldGroup, FieldsetActions};

export type {FieldsetRootProps, FieldsetLegendProps, FieldGroupProps, FieldsetActionsProps};
