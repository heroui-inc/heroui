"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {AlertVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {alertVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";
import {SurfaceContext} from "../surface";

/* ------------------------------------------------------------------------------------------------
 * Alert Context
 * --------------------------------------------------------------------------------------------- */
type AlertContext = {
  slots?: ReturnType<typeof alertVariants>;
  status?: "default" | "accent" | "success" | "warning" | "danger";
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

const AlertRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  status,
  ...rest
}: AlertRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertRootProps<E>>) => {
  const slots = React.useMemo(() => alertVariants({status}), [status]);

  return (
    <AlertContext value={{slots, status}}>
      <SurfaceContext
        value={{
          variant: "default" as SurfaceVariants["variant"],
        }}
      >
        <dom.div className={slots?.base({className})} data-slot="alert-root" {...(rest as any)}>
          {children}
        </dom.div>
      </SurfaceContext>
    </AlertContext>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Indicator
 * --------------------------------------------------------------------------------------------- */
interface AlertIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AlertIndicator = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: AlertIndicatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertIndicatorProps<E>>) => {
  const {slots, status} = useContext(AlertContext);

  // Map status to default icons
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
    <dom.div
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="alert-indicator"
      {...(rest as any)}
    >
      {children ?? getDefaultIcon()}
    </dom.div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Content
 * --------------------------------------------------------------------------------------------- */
interface AlertContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AlertContent = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: AlertContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertContentProps<E>>) => {
  const {slots} = useContext(AlertContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.content, className)}
      data-slot="alert-content"
      {...(rest as any)}
    >
      {children}
    </dom.div>
  );
};

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

const AlertTitle = <E extends keyof React.JSX.IntrinsicElements = "p">({
  children,
  className,
  ...rest
}: AlertTitleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertTitleProps<E>>) => {
  const {slots} = useContext(AlertContext);

  return (
    <dom.p
      className={composeSlotClassName(slots?.title, className)}
      data-slot="alert-title"
      {...(rest as any)}
    >
      {children}
    </dom.p>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Description
 * --------------------------------------------------------------------------------------------- */
interface AlertDescriptionProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AlertDescription = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...rest
}: AlertDescriptionProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AlertDescriptionProps<E>>) => {
  const {slots} = useContext(AlertContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.description, className)}
      data-slot="alert-description"
      {...(rest as any)}
    >
      {children}
    </dom.span>
  );
};

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
