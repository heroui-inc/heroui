"use client";

import type {AlertVariants} from "./alert.styles";
import type {SurfaceVariants} from "../surface";
import type {ComponentPropsWithRef} from "react";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";

import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";
import {SurfaceContext} from "../surface";

import {alertVariants} from "./alert.styles";

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
interface AlertRootProps extends ComponentPropsWithRef<"div">, AlertVariants {
  asChild?: boolean;
}

const AlertRoot = ({asChild, children, className, status, ...rest}: AlertRootProps) => {
  const slots = React.useMemo(() => alertVariants({status}), [status]);
  const Component = asChild ? SlotPrimitive : "div";

  return (
    <AlertContext value={{slots, status}}>
      <SurfaceContext.Provider
        value={{
          variant: "default" as SurfaceVariants["variant"],
        }}
      >
        <Component className={slots?.base({className})} data-slot="alert-root" {...rest}>
          {children}
        </Component>
      </SurfaceContext.Provider>
    </AlertContext>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Indicator
 * --------------------------------------------------------------------------------------------- */
type AlertIndicatorProps = ComponentPropsWithRef<"div"> & {
  asChild?: boolean;
};

const AlertIndicator = ({asChild, children, className, ...rest}: AlertIndicatorProps) => {
  const {slots, status} = useContext(AlertContext);
  const Component = asChild ? SlotPrimitive : "div";

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
    <Component className={slots?.indicator({className})} data-slot="alert-indicator" {...rest}>
      {children ?? getDefaultIcon()}
    </Component>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Content
 * --------------------------------------------------------------------------------------------- */
type AlertContentProps = ComponentPropsWithRef<"div"> & {
  asChild?: boolean;
};

const AlertContent = ({asChild, children, className, ...rest}: AlertContentProps) => {
  const {slots} = useContext(AlertContext);
  const Component = asChild ? SlotPrimitive : "div";

  return (
    <Component className={slots?.content({className})} data-slot="alert-content" {...rest}>
      {children}
    </Component>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Title
 * --------------------------------------------------------------------------------------------- */
type AlertTitleProps = ComponentPropsWithRef<"p"> & {
  asChild?: boolean;
};

const AlertTitle = ({asChild, children, className, ...rest}: AlertTitleProps) => {
  const {slots} = useContext(AlertContext);
  const Component = asChild ? SlotPrimitive : "p";

  return (
    <Component className={slots?.title({className})} data-slot="alert-title" {...rest}>
      {children}
    </Component>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Description
 * --------------------------------------------------------------------------------------------- */
type AlertDescriptionProps = ComponentPropsWithRef<"span"> & {
  asChild?: boolean;
};

const AlertDescription = ({asChild, children, className, ...rest}: AlertDescriptionProps) => {
  const {slots} = useContext(AlertContext);
  const Component = asChild ? SlotPrimitive : "span";

  return (
    <Component className={slots?.description({className})} data-slot="alert-description" {...rest}>
      {children}
    </Component>
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
