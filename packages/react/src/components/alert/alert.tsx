"use client";

import type {AlertVariants} from "./alert.styles";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {isNotAsChild} from "../../utils/props";
import {CircleDashedIcon, CloseIcon} from "../icons";

import {alertVariants} from "./alert.styles";
/* ------------------------------------------------------------------------------------------------
 * Alert Context
 * --------------------------------------------------------------------------------------------- */
type AlertContext = {
  slots?: ReturnType<typeof alertVariants>;
};
const AlertContext = createContext<AlertContext>({});

/* ------------------------------------------------------------------------------------------------
 * Alert
 * --------------------------------------------------------------------------------------------- */
interface AlertProps extends React.ComponentProps<"div">, AlertVariants {
  asChild?: boolean;
}
const Alert = ({asChild, children, className, variant, ...rest}: AlertProps) => {
  const slots = React.useMemo(() => alertVariants({variant}), [variant]);
  const Component = asChild ? SlotPrimitive : "div";

  return (
    <AlertContext value={{slots}}>
      <Component className={slots?.base({className})} data-slot="alert-root" {...rest}>
        {children}
      </Component>
    </AlertContext>
  );
};

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
    <Component className={slots?.icon({className})} data-slot="alert-icon" {...rest}>
      {children ?? <CircleDashedIcon data-slot="alert-default-icon" />}
    </Component>
  );
};

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
    <Component className={slots?.content({className})} data-slot="alert-content" {...rest}>
      {children}
    </Component>
  );
};

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
    <Component className={slots?.title({className})} data-slot="alert-title" {...rest}>
      {children}
    </Component>
  );
};

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
    <Component className={slots?.description({className})} data-slot="alert-description" {...rest}>
      {children}
    </Component>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Alert Action
 * --------------------------------------------------------------------------------------------- */
interface AlertAction {
  (props: {asChild: true} & React.ComponentProps<"button">): React.JSX.Element;
  (props: {asChild?: false} & ButtonPrimitiveProps): React.JSX.Element;
  displayName: string;
}
const AlertAction: AlertAction = (props) => {
  const {slots} = useContext(AlertContext);

  if (isNotAsChild(props)) {
    const {children, className, ...rest} = props;

    return (
      <ButtonPrimitive
        className={composeTwRenderProps(className, slots?.action?.())}
        data-slot="alert-action"
        {...rest}
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </ButtonPrimitive>
    );
  }
  const {asChild: _asChild, children, className, ...rest} = props;

  return (
    <SlotPrimitive className={slots?.action?.({className})} data-slot="alert-action" {...rest}>
      {children}
    </SlotPrimitive>
  );
};

AlertAction.displayName = "AlertAction";
/* ------------------------------------------------------------------------------------------------
 * Alert Close
 * --------------------------------------------------------------------------------------------- */
interface AlertClose {
  (props: {asChild: true} & React.ComponentProps<"button">): React.JSX.Element;
  (props: {asChild?: false} & ButtonPrimitiveProps): React.JSX.Element;
  displayName: string;
}
const AlertClose: AlertClose = (props) => {
  const {slots} = useContext(AlertContext);

  if (isNotAsChild(props)) {
    const {children, className, ...rest} = props;

    return (
      <ButtonPrimitive
        className={composeTwRenderProps(className, slots?.close?.())}
        data-slot="alert-close"
        {...rest}
      >
        {(renderProps) =>
          typeof children === "function"
            ? children(renderProps)
            : (children ?? <CloseIcon data-slot="alert-default-close-icon" />)
        }
      </ButtonPrimitive>
    );
  }
  const {asChild: _asChild, children, className, ...rest} = props;

  return (
    <SlotPrimitive className={slots?.close?.({className})} data-slot="alert-close" {...rest}>
      {children ?? <CloseIcon data-slot="alert-default-close-icon" />}
    </SlotPrimitive>
  );
};

AlertClose.displayName = "AlertClose";
/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertAction, AlertClose};
// For AlertAction and AlertClose, we need to export their prop types
type AlertActionProps =
  | ({asChild: true} & React.ComponentProps<"button">)
  | ({asChild?: false} & ButtonPrimitiveProps);
type AlertCloseProps =
  | ({asChild: true} & React.ComponentProps<"button">)
  | ({asChild?: false} & ButtonPrimitiveProps);
export type {
  AlertProps,
  AlertIconProps,
  AlertContentProps,
  AlertTitleProps,
  AlertDescriptionProps,
  AlertActionProps,
  AlertCloseProps,
};
