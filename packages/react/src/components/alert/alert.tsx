"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {AlertVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {alertVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";
import {SurfaceContext} from "../surface";

/* ------------------------------------------------------------------------------------------------
 * Alert Context
 * --------------------------------------------------------------------------------------------- */
type AlertContext = {
  contentClassName?: string;
  descriptionClassName?: string;
  indicatorClassName?: string;
  status?: "default" | "accent" | "success" | "warning" | "danger";
  titleClassName?: string;
};

const AlertContext = createContext<AlertContext>({});

/* ------------------------------------------------------------------------------------------------
 * Alert Root
 * --------------------------------------------------------------------------------------------- */
interface AlertRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Alert status. */
  status?: AlertVariants["status"];
}

function AlertRootInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  status,
  ...rest
}: AlertRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertRootProps<E>>) {
  const slots = useMemo(() => alertVariants({status}), [status]);
  const contextValue = useMemo<AlertContext>(
    () => ({
      contentClassName: slots.content(),
      descriptionClassName: slots.description(),
      indicatorClassName: slots.indicator(),
      status,
      titleClassName: slots.title(),
    }),
    [slots, status],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  return (
    <AlertContext value={contextValue}>
      <SurfaceContext
        value={{
          variant: "default" as SurfaceVariants["variant"],
        }}
      >
        <dom.div className={resolvedClassName} data-slot="alert-root" {...(rest as any)}>
          {children}
        </dom.div>
      </SurfaceContext>
    </AlertContext>
  );
}

const AlertRoot = memo(AlertRootInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: AlertRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertRootProps<E>>,
) => React.JSX.Element;

/* ------------------------------------------------------------------------------------------------
 * Alert Indicator
 * --------------------------------------------------------------------------------------------- */
interface AlertIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function AlertIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: AlertIndicatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertIndicatorProps<E>>) {
  const {indicatorClassName, status} = useContext(AlertContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, indicatorClassName) as string,
    [className, indicatorClassName],
  );

  const getDefaultIcon = () => {
    switch (status) {
      case "accent":
        return <InfoIcon data-slot="alert-default-icon" />;
      case "success":
        return <SuccessIcon data-slot="alert-default-icon" />;
      case "warning":
        return <WarningIcon data-slot="alert-default-icon" />;
      case "danger":
        return <DangerIcon data-slot="alert-default-icon" />;
      default:
        return <InfoIcon data-slot="alert-default-icon" />;
    }
  };

  return (
    <dom.div className={resolvedClassName} data-slot="alert-indicator" {...(rest as any)}>
      {children ?? getDefaultIcon()}
    </dom.div>
  );
}

const AlertIndicator = memo(AlertIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: AlertIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof AlertIndicatorProps<E>>,
) => React.JSX.Element;

/* ------------------------------------------------------------------------------------------------
 * Alert Content
 * --------------------------------------------------------------------------------------------- */
interface AlertContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function AlertContentInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: AlertContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertContentProps<E>>) {
  const {contentClassName} = useContext(AlertContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contentClassName) as string,
    [className, contentClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="alert-content" {...(rest as any)}>
      {children}
    </dom.div>
  );
}

const AlertContent = memo(AlertContentInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: AlertContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertContentProps<E>>,
) => React.JSX.Element;

/* ------------------------------------------------------------------------------------------------
 * Alert Title
 * --------------------------------------------------------------------------------------------- */
interface AlertTitleProps<E extends keyof React.JSX.IntrinsicElements = "p"> extends DOMRenderProps<
  E,
  undefined
> {
  children?: ReactNode;
  className?: string;
}

function AlertTitleInner<E extends keyof React.JSX.IntrinsicElements = "p">({
  children,
  className,
  ...rest
}: AlertTitleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertTitleProps<E>>) {
  const {titleClassName} = useContext(AlertContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, titleClassName) as string,
    [className, titleClassName],
  );

  return (
    <dom.p className={resolvedClassName} data-slot="alert-title" {...(rest as any)}>
      {children}
    </dom.p>
  );
}

const AlertTitle = memo(AlertTitleInner) as <E extends keyof React.JSX.IntrinsicElements = "p">(
  props: AlertTitleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertTitleProps<E>>,
) => React.JSX.Element;

/* ------------------------------------------------------------------------------------------------
 * Alert Description
 * --------------------------------------------------------------------------------------------- */
interface AlertDescriptionProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function AlertDescriptionInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...rest
}: AlertDescriptionProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AlertDescriptionProps<E>>) {
  const {descriptionClassName} = useContext(AlertContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, descriptionClassName) as string,
    [className, descriptionClassName],
  );

  return (
    <dom.span className={resolvedClassName} data-slot="alert-description" {...(rest as any)}>
      {children}
    </dom.span>
  );
}

const AlertDescription = memo(AlertDescriptionInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: AlertDescriptionProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof AlertDescriptionProps<E>>,
) => React.JSX.Element;

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {AlertRoot, AlertIndicator, AlertContent, AlertTitle, AlertDescription};

export type {
  AlertRootProps,
  AlertIndicatorProps,
  AlertContentProps,
  AlertTitleProps,
  AlertDescriptionProps,
};
