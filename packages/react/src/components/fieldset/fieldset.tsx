"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ReactNode} from "react";

import {fieldsetVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {
  ButtonContext,
  CheckboxGroupContext,
  LinkContext,
  Provider,
  RadioGroupContext,
  SliderContext,
  ToggleButtonContext,
  ToggleButtonGroupContext,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Fieldset Context
 * -----------------------------------------------------------------------------------------------*/
type FieldsetContext = {
  actionsClassName?: string;
  fieldGroupClassName?: string;
  legendClassName?: string;
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

function FieldsetRootInner<E extends keyof React.JSX.IntrinsicElements = "fieldset">({
  children,
  className,
  ...props
}: FieldsetRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetRootProps<E>>) {
  const slots = useMemo(() => fieldsetVariants({}), []);
  const contextValue = useMemo<FieldsetContext>(
    () => ({
      actionsClassName: slots.actions(),
      fieldGroupClassName: slots.fieldGroup(),
      legendClassName: slots.legend(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  const isDisabled = "disabled" in props && props.disabled === true;

  return (
    <FieldsetContext value={contextValue}>
      <dom.fieldset
        className={resolvedClassName}
        data-disabled={isDisabled || undefined}
        data-slot="fieldset"
        {...(props as any)}
      >
        {isDisabled ? (
          <Provider
            values={[
              [ButtonContext, {isDisabled: true}],
              [CheckboxGroupContext, {isDisabled: true}],
              [LinkContext, {isDisabled: true}],
              [RadioGroupContext, {isDisabled: true}],
              [SliderContext, {isDisabled: true}],
              [ToggleButtonContext, {isDisabled: true}],
              [ToggleButtonGroupContext, {isDisabled: true}],
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
}

const FieldsetRoot = memo(FieldsetRootInner) as <
  E extends keyof React.JSX.IntrinsicElements = "fieldset",
>(
  props: FieldsetRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetRootProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Fieldset Legend
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetLegendProps<
  E extends keyof React.JSX.IntrinsicElements = "legend",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function FieldsetLegendInner<E extends keyof React.JSX.IntrinsicElements = "legend">({
  className,
  ...props
}: FieldsetLegendProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetLegendProps<E>>) {
  const {legendClassName} = useContext(FieldsetContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, legendClassName) as string,
    [className, legendClassName],
  );

  return (
    <dom.legend className={resolvedClassName} data-slot="fieldset-legend" {...(props as any)} />
  );
}

const FieldsetLegend = memo(FieldsetLegendInner) as <
  E extends keyof React.JSX.IntrinsicElements = "legend",
>(
  props: FieldsetLegendProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof FieldsetLegendProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Field Group
 * -----------------------------------------------------------------------------------------------*/
interface FieldGroupProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function FieldGroupInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...rest
}: FieldGroupProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldGroupProps<E>>) {
  const {fieldGroupClassName} = useContext(FieldsetContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, fieldGroupClassName) as string,
    [className, fieldGroupClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="fieldset-field-group" {...(rest as any)} />
  );
}

const FieldGroup = memo(FieldGroupInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: FieldGroupProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldGroupProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Field Actions
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetActionsProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function FieldsetActionsInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: FieldsetActionsProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetActionsProps<E>>) {
  const {actionsClassName} = useContext(FieldsetContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, actionsClassName) as string,
    [className, actionsClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="fieldset-actions" {...(rest as any)}>
      {children}
    </dom.div>
  );
}

const FieldsetActions = memo(FieldsetActionsInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: FieldsetActionsProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof FieldsetActionsProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FieldsetRoot, FieldsetLegend, FieldGroup, FieldsetActions};

export type {FieldsetRootProps, FieldsetLegendProps, FieldGroupProps, FieldsetActionsProps};
