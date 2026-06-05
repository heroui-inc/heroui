"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SwitchVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {SwitchButtonRenderProps, SwitchFieldRenderProps} from "react-aria-components/Switch";

import {switchVariants} from "@heroui/styles";
import React, {createContext, useContext, useId} from "react";
import {
  SwitchButton as SwitchButtonPrimitive,
  SwitchField as SwitchFieldPrimitive,
} from "react-aria-components/Switch";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

import {SwitchButtonContext, SwitchFieldIdContext} from "./switch-context";

interface SwitchFieldContextValue {
  slots?: ReturnType<typeof switchVariants>;
  fieldState?: SwitchFieldRenderProps;
}

const SwitchFieldContext = createContext<SwitchFieldContextValue>({});

/* -------------------------------------------------------------------------------------------------
 * Switch (Field) — React Aria `SwitchField`. RSC-safe: it does not inspect children.
 * -----------------------------------------------------------------------------------------------*/
interface SwitchRootProps
  extends ComponentPropsWithRef<typeof SwitchFieldPrimitive>, SwitchVariants {}

const SwitchRoot = ({children, className, id, size, ...props}: SwitchRootProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const slots = React.useMemo(() => switchVariants({size}), [size]);

  return (
    <SwitchFieldPrimitive
      data-slot="switch"
      id={inputId}
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(fieldState) => (
        <SwitchFieldIdContext value={{inputId}}>
          <SwitchFieldContext value={{slots, fieldState}}>
            {typeof children === "function" ? children(fieldState) : children}
          </SwitchFieldContext>
        </SwitchFieldIdContext>
      )}
    </SwitchFieldPrimitive>
  );
};

SwitchRoot.displayName = "HeroUI.Switch";

/* -------------------------------------------------------------------------------------------------
 * Switch.Button — clickable `SwitchButton` label wrapping the control + `Label`.
 * Keep `Description`/`FieldError` as siblings of `Switch.Button`.
 * -----------------------------------------------------------------------------------------------*/
interface SwitchButtonRootProps extends ComponentPropsWithRef<typeof SwitchButtonPrimitive> {}

const SwitchButtonRoot = ({children, className, ...props}: SwitchButtonRootProps) => {
  const {slots} = useContext(SwitchFieldContext);

  return (
    <SwitchButtonPrimitive
      data-slot="switch-button"
      {...props}
      className={composeTwRenderProps(className, slots?.button())}
    >
      {(buttonState) => (
        <SwitchButtonContext value={{buttonState}}>
          {typeof children === "function" ? children(buttonState) : children}
        </SwitchButtonContext>
      )}
    </SwitchButtonPrimitive>
  );
};

SwitchButtonRoot.displayName = "HeroUI.Switch.Button";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchControlProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode | ((props: SwitchButtonRenderProps) => ReactNode);
  className?: string;
}

const SwitchControl = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchControlProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchControlProps<E>>) => {
  const {slots} = useContext(SwitchFieldContext);
  const {buttonState} = useContext(SwitchButtonContext);

  const control = (
    <dom.span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="switch-control"
      {...(props as any)}
    >
      {typeof children === "function"
        ? children(buttonState ?? ({} as SwitchButtonRenderProps))
        : children}
    </dom.span>
  );

  if (buttonState != null) {
    return control;
  }

  // Control-only: self-wrap so the control is the clickable target (RSC-safe).
  return (
    <SwitchButtonPrimitive className={slots?.button()} data-slot="switch-button">
      {(state) => <SwitchButtonContext value={{buttonState: state}}>{control}</SwitchButtonContext>}
    </SwitchButtonPrimitive>
  );
};

SwitchControl.displayName = "HeroUI.Switch.Control";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchThumbProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchThumb = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchThumbProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchThumbProps<E>>) => {
  const {slots} = useContext(SwitchFieldContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.thumb, className)}
      data-slot="switch-thumb"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

SwitchThumb.displayName = "HeroUI.Switch.Thumb";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchIcon = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchIconProps<E>>) => {
  const {slots} = useContext(SwitchFieldContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.icon, className)}
      data-slot="switch-icon"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

SwitchIcon.displayName = "HeroUI.Switch.Icon";

/* ----------------------------------------------------------------------------------------------*/

export {SwitchRoot, SwitchButtonRoot, SwitchControl, SwitchThumb, SwitchIcon};
export {SwitchButtonContext, SwitchFieldIdContext} from "./switch-context";
export type {
  SwitchRootProps,
  SwitchButtonRootProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchIconProps,
  SwitchFieldRenderProps,
  SwitchButtonRenderProps,
};
