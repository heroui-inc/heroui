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
      {children ?? <CircleDashedIcon data-alert-default-icon />}
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
        data-alert-action
        className={composeTwRenderProps(className, slots?.action?.())}
        {...rest}
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </ButtonPrimitive>
    );
  }

  const {asChild: _asChild, children, className, ...rest} = props;

  return (
    <SlotPrimitive data-alert-action className={slots?.action?.({className})} {...rest}>
      {children}
    </SlotPrimitive>
  );
};

AlertAction.displayName = "HeroUI.Alert.Action";

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
        data-alert-close
        className={composeTwRenderProps(className, slots?.close?.())}
        {...rest}
      >
        {(renderProps) =>
          typeof children === "function"
            ? children(renderProps)
            : (children ?? <CloseIcon data-alert-default-close-icon />)
        }
      </ButtonPrimitive>
    );
  }

  const {asChild: _asChild, children, className, ...rest} = props;

  return (
    <SlotPrimitive data-alert-close className={slots?.close?.({className})} {...rest}>
      {children ?? <CloseIcon data-alert-default-close-icon />}
    </SlotPrimitive>
  );
};

AlertClose.displayName = "HeroUI.Alert.Close";

const CompoundAlert = Object.assign(AlertRoot, {
  Icon: AlertIcon,
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
  Close: AlertClose,
  Content: AlertContent,
});

export default CompoundAlert;
