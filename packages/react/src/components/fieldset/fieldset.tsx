"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ReactNode} from "react";

import {fieldsetVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Provider, RadioGroupContext, SliderContext} from "react-aria-components";

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
  children,
  className,
  ...props
}: FieldsetRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetRootProps<E>>) => {
  const slots = React.useMemo(() => fieldsetVariants({}), []);

  // Mirror native `<fieldset disabled>` as `data-disabled="true"` so the
  // existing `[data-disabled="true"] .label` (and similar) ancestor selectors
  // cascade disabled styling to descendant fields, just like a direct
  // `isDisabled` prop on TextField/Checkbox/etc. would.
  const isDisabled = "disabled" in props && props.disabled === true;

  return (
    <FieldsetContext value={{slots}}>
      <dom.fieldset
        className={slots?.base({className})}
        data-disabled={isDisabled || undefined}
        data-slot="fieldset"
        {...(props as any)}
      >
        {isDisabled ? (
          // Slider and RadioGroup render as <div> (no native form controls),
          // so the browser doesn't propagate <fieldset disabled> to them.
          // Forward `isDisabled` explicitly via React Aria's context so their
          // wrapper elements receive `data-disabled` and behave as disabled.
          <Provider
            values={[
              [RadioGroupContext, {isDisabled: true}],
              [SliderContext, {isDisabled: true}],
            ]}
          >
            {children}
          </Provider>
        ) : (
          children
        )}
      </dom.fieldset>
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
