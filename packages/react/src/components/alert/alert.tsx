"use client";

import type {SurfaceVariants} from "../surface";
import type {AlertVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {alertVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";

import {composeSlotClassName} from "../../utils/compose";
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
interface AlertRootProps extends ComponentPropsWithRef<"div">, AlertVariants {}

const AlertRoot = ({children, className, status, ...rest}: AlertRootProps) => {
  const slots = React.useMemo(() => alertVariants({status}), [status]);

  return (
    <AlertContext value={{slots, status}}>
      <SurfaceContext
        value={{
          variant: "default" as SurfaceVariants["variant"],
        }}
      >
        <div className={slots?.base({className})} data-slot="alert-root" {...rest}>
          {children}
        </div>
      </SurfaceContext>
    </AlertContext>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Indicator
 * --------------------------------------------------------------------------------------------- */
type AlertIndicatorProps = ComponentPropsWithRef<"div">;

const AlertIndicator = ({children, className, ...rest}: AlertIndicatorProps) => {
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
    <div
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="alert-indicator"
      {...rest}
    >
      {children ?? getDefaultIcon()}
    </div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Content
 * --------------------------------------------------------------------------------------------- */
type AlertContentProps = ComponentPropsWithRef<"div">;

const AlertContent = ({children, className, ...rest}: AlertContentProps) => {
  const {slots} = useContext(AlertContext);

  return (
    <div
      className={composeSlotClassName(slots?.content, className)}
      data-slot="alert-content"
      {...rest}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Title
 * --------------------------------------------------------------------------------------------- */
type AlertTitleProps = ComponentPropsWithRef<"p">;

const AlertTitle = ({children, className, ...rest}: AlertTitleProps) => {
  const {slots} = useContext(AlertContext);

  return (
    <p className={composeSlotClassName(slots?.title, className)} data-slot="alert-title" {...rest}>
      {children}
    </p>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Description
 * --------------------------------------------------------------------------------------------- */
type AlertDescriptionProps = ComponentPropsWithRef<"span">;

const AlertDescription = ({children, className, ...rest}: AlertDescriptionProps) => {
  const {slots} = useContext(AlertContext);

  return (
    <span
      className={composeSlotClassName(slots?.description, className)}
      data-slot="alert-description"
      {...rest}
    >
      {children}
    </span>
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
