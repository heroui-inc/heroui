"use client";

import type {AlertVariants} from "./alert.styles";
import type {SVGProps} from "react";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";

import {alertVariants} from "./alert.styles";

/* ------------------------------------------------------------------------------------------------
 * Alert Context
 * --------------------------------------------------------------------------------------------- */
type AlertContext = {
  slots?: ReturnType<typeof alertVariants>;
};

const AlertContext = createContext<AlertContext>({});

/* ------------------------------------------------------------------------------------------------
 * Alert Root
 * --------------------------------------------------------------------------------------------- */
interface AlertRootProps extends React.ComponentProps<"div">, AlertVariants {
  asChild?: boolean;
}

const AlertRoot = ({asChild, children, className, variant, ...rest}: AlertRootProps) => {
  const slots = React.useMemo(() => alertVariants({variant}), [variant]);

  const Component = asChild ? SlotPrimitive : "div";

  return (
    <AlertContext.Provider value={{slots}}>
      <Component data-alert-root className={slots?.base({className})} {...rest}>
        {children}
      </Component>
    </AlertContext.Provider>
  );
};

AlertRoot.displayName = "HeroUI.Alert.Root";

/* ------------------------------------------------------------------------------------------------
 * Alert Default Icon
 * --------------------------------------------------------------------------------------------- */

const AlertDefaultIcon = React.memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    data-alert-default-icon
    fill="none"
    height={16}
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.906 1.085a7.047 7.047 0 0 1 2.188 0 .75.75 0 0 1-.232 1.482 5.546 5.546 0 0 0-1.724 0 .75.75 0 0 1-.232-1.482ZM4.933 2.502a.75.75 0 0 1-.166 1.048c-.466.34-.878.75-1.217 1.217a.75.75 0 0 1-1.213-.882 7.036 7.036 0 0 1 1.548-1.548.75.75 0 0 1 1.048.165Zm6.135 0a.75.75 0 0 1 1.047-.165 7.037 7.037 0 0 1 1.548 1.548.75.75 0 0 1-1.213.882 5.533 5.533 0 0 0-1.217-1.217.75.75 0 0 1-.165-1.048ZM1.943 6.28a.75.75 0 0 1 .624.857 5.546 5.546 0 0 0 0 1.724.75.75 0 0 1-1.482.232 7.047 7.047 0 0 1 0-2.188.75.75 0 0 1 .858-.625Zm12.114 0a.75.75 0 0 1 .858.625 7.048 7.048 0 0 1 0 2.188.75.75 0 1 1-1.482-.232 5.54 5.54 0 0 0 0-1.724.75.75 0 0 1 .624-.857ZM2.502 11.068a.75.75 0 0 1 1.048.165c.34.466.75.878 1.217 1.217a.75.75 0 0 1-.882 1.213 7.037 7.037 0 0 1-1.548-1.548.75.75 0 0 1 .165-1.047Zm10.996 0a.75.75 0 0 1 .165 1.047 7.037 7.037 0 0 1-1.548 1.548.75.75 0 0 1-.883-1.213 5.53 5.53 0 0 0 1.218-1.217.75.75 0 0 1 1.048-.165Zm-7.217 2.99a.75.75 0 0 1 .857-.625 5.54 5.54 0 0 0 1.724 0 .75.75 0 0 1 .232 1.482 7.048 7.048 0 0 1-2.188 0 .75.75 0 0 1-.625-.857Z"
      fill="currentColor"
    />
  </svg>
));

AlertDefaultIcon.displayName = "HeroUI.Alert.DefaultIcon";

/* ------------------------------------------------------------------------------------------------
 * Alert Icon
 * --------------------------------------------------------------------------------------------- */
type AlertIconProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

const AlertIcon = ({asChild, children, className, ...rest}: AlertIconProps) => {
  const {slots} = useContext(AlertContext);

  const Component = asChild ? SlotPrimitive : "div";

  return (
    <Component data-alert-icon className={slots?.icon({className})} {...rest}>
      {children ?? <AlertDefaultIcon />}
    </Component>
  );
};

AlertIcon.displayName = "HeroUI.Alert.Icon";

/* ------------------------------------------------------------------------------------------------
 * Alert Content
 * --------------------------------------------------------------------------------------------- */
type AlertContentProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

const AlertContent = ({asChild, children, className, ...rest}: AlertContentProps) => {
  const {slots} = useContext(AlertContext);

  const Component = asChild ? SlotPrimitive : "div";

  return (
    <Component data-alert-content className={slots?.content({className})} {...rest}>
      {children}
    </Component>
  );
};

AlertContent.displayName = "HeroUI.Alert.Content";

/* ------------------------------------------------------------------------------------------------
 * Alert Title
 * --------------------------------------------------------------------------------------------- */
type AlertTitleProps = React.ComponentProps<"p"> & {
  asChild?: boolean;
};

const AlertTitle = ({asChild, children, className, ...rest}: AlertTitleProps) => {
  const {slots} = useContext(AlertContext);

  const Component = asChild ? SlotPrimitive : "p";

  return (
    <Component data-alert-title className={slots?.title({className})} {...rest}>
      {children}
    </Component>
  );
};

AlertTitle.displayName = "HeroUI.Alert.Title";

/* ------------------------------------------------------------------------------------------------
 * Alert Description
 * --------------------------------------------------------------------------------------------- */
type AlertDescriptionProps = React.ComponentProps<"span"> & {
  asChild?: boolean;
};

const AlertDescription = ({asChild, children, className, ...rest}: AlertDescriptionProps) => {
  const {slots} = useContext(AlertContext);

  const Component = asChild ? SlotPrimitive : "span";

  return (
    <Component data-alert-description className={slots?.description({className})} {...rest}>
      {children}
    </Component>
  );
};

AlertDescription.displayName = "HeroUI.Alert.Description";

/* ------------------------------------------------------------------------------------------------
 * Alert Action
 * --------------------------------------------------------------------------------------------- */
type AlertActionProps = React.ComponentProps<"div">;

const AlertAction = ({children, className, ...rest}: AlertActionProps) => {
  const {slots} = useContext(AlertContext);

  return (
    <div data-alert-action className={slots?.action({className})} {...rest}>
      {children}
    </div>
  );
};

AlertAction.displayName = "HeroUI.AlertAction";

/* ------------------------------------------------------------------------------------------------
 * Alert Default Close Icon
 * --------------------------------------------------------------------------------------------- */

const AlertDefaultCloseIcon = React.memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    data-alert-default-close-icon
    fill="none"
    height={16}
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
));

AlertDefaultCloseIcon.displayName = "HeroUI.Alert.DefaultCloseIcon";

/* ------------------------------------------------------------------------------------------------
 * Alert Close
 * --------------------------------------------------------------------------------------------- */
type AlertCloseProps = React.ComponentProps<"div">;

const AlertClose = ({children, className, ...rest}: AlertCloseProps) => {
  const {slots} = useContext(AlertContext);

  return (
    <div data-alert-close className={slots?.close({className})} {...rest}>
      {children ?? <AlertDefaultCloseIcon />}
    </div>
  );
};

AlertClose.displayName = "HeroUI.AlertClose";

export {
  AlertRoot as Root,
  AlertIcon as Icon,
  AlertTitle as Title,
  AlertDescription as Description,
  AlertAction as Action,
  AlertClose as Close,
  AlertContent as Content,
};

export type {
  AlertRootProps as RootProps,
  AlertIconProps as IconProps,
  AlertTitleProps as TitleProps,
  AlertDescriptionProps as DescriptionProps,
  AlertActionProps as ActionProps,
  AlertCloseProps as CloseProps,
};
