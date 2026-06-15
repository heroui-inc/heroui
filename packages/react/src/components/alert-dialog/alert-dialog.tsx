"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {AlertDialogVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, HTMLAttributes, ReactNode} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components/Button";
import type {DialogProps as DialogPrimitiveProps} from "react-aria-components/Dialog";

import {alertDialogVariants} from "@heroui/styles";
import React, {createContext, memo, useCallback, useContext, useMemo} from "react";
import {
  DialogTrigger as AlertDialogTriggerPrimitive,
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
} from "react-aria-components/Dialog";
import {
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components/Modal";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";

type AlertDialogPlacement = "auto" | "top" | "center" | "bottom";

type AlertDialogStatus = "default" | "accent" | "success" | "warning" | "danger";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Context
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogContext = {
  backdropClassName?: string;
  bodyClassName?: string;
  closeTriggerClassName?: string;
  containerClassName?: string;
  dialogClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
  headingClassName?: string;
  placement?: AlertDialogPlacement;
  triggerClassName?: string;
};

const AlertDialogContext = createContext<AlertDialogContext>({});

const createAlertDialogContextFromSlots = (
  slots: ReturnType<typeof alertDialogVariants>,
  prev: AlertDialogContext = {},
): AlertDialogContext => ({
  ...prev,
  backdropClassName: slots.backdrop(),
  bodyClassName: slots.body(),
  closeTriggerClassName: slots.closeTrigger(),
  containerClassName: slots.container(),
  dialogClassName: slots.dialog(),
  footerClassName: slots.footer(),
  headerClassName: slots.header(),
  headingClassName: slots.heading(),
  triggerClassName: slots.trigger(),
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Root
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogRootProps extends ComponentPropsWithRef<typeof AlertDialogTriggerPrimitive> {}

const AlertDialogRoot = memo(function AlertDialogRoot({children, ...props}: AlertDialogRootProps) {
  const slots = useMemo(() => alertDialogVariants(), []);
  const alertDialogContext = useMemo<AlertDialogContext>(
    () => createAlertDialogContextFromSlots(slots),
    [slots],
  );

  return (
    <AlertDialogContext value={alertDialogContext}>
      <AlertDialogTriggerPrimitive data-slot="alert-dialog-root" {...props}>
        {children}
      </AlertDialogTriggerPrimitive>
    </AlertDialogContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogTriggerProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogTrigger = memo(function AlertDialogTrigger({
  children,
  className,
  ...props
}: AlertDialogTriggerProps) {
  const {triggerClassName} = useContext(AlertDialogContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName) as string,
    [className, triggerClassName],
  );

  return (
    <PressablePrimitive>
      <div className={resolvedClassName} data-slot="alert-dialog-trigger" role="button" {...props}>
        {children}
      </div>
    </PressablePrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Backdrop
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogBackdropProps extends ComponentPropsWithRef<typeof ModalOverlayPrimitive> {
  variant?: AlertDialogVariants["variant"];
  /**
   * Whether to close the alert dialog when the user interacts outside it.
   * Alert dialogs typically require explicit action, so this defaults to false.
   * @default false
   */
  isDismissable?: boolean;
  /**
   * Whether pressing the escape key to close the modal should be disabled.
   * Alert dialogs typically require explicit action, so this defaults to true.
   * @default true
   */
  isKeyboardDismissDisabled?: boolean;
}

const AlertDialogBackdrop = memo(function AlertDialogBackdrop({
  children,
  className,
  isDismissable = false,
  isKeyboardDismissDisabled = true,
  onClick,
  variant,
  ...props
}: AlertDialogBackdropProps) {
  const contextValue = useContext(AlertDialogContext);

  const updatedSlots = useMemo(() => alertDialogVariants({variant}), [variant]);

  const updatedModalContext = useMemo<AlertDialogContext>(
    () => ({
      ...contextValue,
      backdropClassName: updatedSlots.backdrop(),
    }),
    [contextValue, updatedSlots],
  );

  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, updatedSlots.backdrop()),
    [className, updatedSlots],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClick?.(e);
    },
    [onClick],
  );

  return (
    <ModalOverlayPrimitive
      className={resolvedClassName}
      data-slot="alert-dialog-backdrop"
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      onClick={handleClick}
      {...props}
    >
      {(renderProps) => (
        <AlertDialogContext value={updatedModalContext}>
          {typeof children === "function" ? children(renderProps) : children}{" "}
        </AlertDialogContext>
      )}
    </ModalOverlayPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Container
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogContainerProps extends Omit<
  ComponentPropsWithRef<typeof ModalPrimitive>,
  Exclude<keyof AlertDialogBackdropProps, "children" | "className">
> {
  /**
   * The placement of the alert dialog on the screen.
   * @default "auto"
   */
  placement?: AlertDialogPlacement;
  size?: AlertDialogVariants["size"];
}

const AlertDialogContainer = memo(function AlertDialogContainer({
  children,
  className,
  placement = "auto",
  size,
  ...props
}: AlertDialogContainerProps) {
  const contextValue = useContext(AlertDialogContext);

  const updatedSlots = useMemo(() => alertDialogVariants({size}), [size]);

  const updatedContext = useMemo<AlertDialogContext>(
    () => ({
      ...contextValue,
      placement,
      containerClassName: updatedSlots.container(),
      dialogClassName: updatedSlots.dialog(),
    }),
    [contextValue, placement, updatedSlots],
  );

  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, updatedSlots.container()),
    [className, updatedSlots],
  );

  return (
    <ModalPrimitive
      className={resolvedClassName}
      data-placement={placement}
      data-slot="alert-dialog-container"
      {...props}
    >
      {(renderProps) => (
        <AlertDialogContext value={updatedContext}>
          {typeof children === "function" ? children(renderProps) : children}
        </AlertDialogContext>
      )}
    </ModalPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Dialog
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogDialogProps extends DialogPrimitiveProps {}

const AlertDialogDialog = memo(function AlertDialogDialog({
  children,
  className,
  ...props
}: AlertDialogDialogProps) {
  const {dialogClassName, placement} = useContext(AlertDialogContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, dialogClassName) as string,
    [className, dialogClassName],
  );

  return (
    <DialogPrimitive
      className={resolvedClassName}
      data-placement={placement}
      data-slot="alert-dialog-dialog"
      role="alertdialog"
      {...props}
    >
      {children}
    </DialogPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Header
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogHeader = memo(function AlertDialogHeader({
  children,
  className,
  ...props
}: AlertDialogHeaderProps) {
  const {headerClassName} = useContext(AlertDialogContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerClassName) as string,
    [className, headerClassName],
  );

  return (
    <div className={resolvedClassName} data-slot="alert-dialog-header" {...props}>
      {children}
    </div>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Heading
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const AlertDialogHeading = memo(function AlertDialogHeading({
  children,
  className,
  ...props
}: AlertDialogHeadingProps) {
  const {headingClassName} = useContext(AlertDialogContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headingClassName) as string,
    [className, headingClassName],
  );

  return (
    <HeadingPrimitive
      className={resolvedClassName}
      data-slot="alert-dialog-heading"
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Body
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogBodyProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogBody = memo(function AlertDialogBody({
  children,
  className,
  ...props
}: AlertDialogBodyProps) {
  const {bodyClassName} = useContext(AlertDialogContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, bodyClassName) as string,
    [className, bodyClassName],
  );

  return (
    <div className={resolvedClassName} data-slot="alert-dialog-body" {...props}>
      {children}
    </div>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Footer
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogFooter = memo(function AlertDialogFooter({
  children,
  className,
  ...props
}: AlertDialogFooterProps) {
  const {footerClassName} = useContext(AlertDialogContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, footerClassName) as string,
    [className, footerClassName],
  );

  return (
    <div className={resolvedClassName} data-slot="alert-dialog-footer" {...props}>
      {children}
    </div>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Icon
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogIconProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  /**
   * The semantic status of the icon, affects background color and default icon
   * @default "danger"
   */
  status?: AlertDialogStatus;
}

function AlertDialogIconInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  status = "danger",
  ...props
}: AlertDialogIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AlertDialogIconProps<E>>) {
  const slots = useMemo(() => alertDialogVariants({status}), [status]);
  const iconClassName = useMemo(() => slots.icon(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, iconClassName) as string,
    [className, iconClassName],
  );

  const getDefaultIcon = () => {
    switch (status) {
      case "default":
        return <InfoIcon data-slot="alert-dialog-default-icon" />;
      case "accent":
        return <InfoIcon data-slot="alert-dialog-default-icon" />;
      case "success":
        return <SuccessIcon data-slot="alert-dialog-default-icon" />;
      case "warning":
        return <WarningIcon data-slot="alert-dialog-default-icon" />;
      case "danger":
        return <DangerIcon data-slot="alert-dialog-default-icon" />;
      default:
        return <DangerIcon data-slot="alert-dialog-default-icon" />;
    }
  };

  return (
    <dom.div className={resolvedClassName} data-slot="alert-dialog-icon" {...(props as any)}>
      {children ?? getDefaultIcon()}
    </dom.div>
  );
}

const AlertDialogIcon = memo(AlertDialogIconInner) as typeof AlertDialogIconInner;

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Close Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogCloseTriggerProps extends ButtonPrimitiveProps {}

const AlertDialogCloseTrigger = memo(function AlertDialogCloseTrigger({
  className,
  ...rest
}: AlertDialogCloseTriggerProps) {
  const {closeTriggerClassName} = useContext(AlertDialogContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, closeTriggerClassName),
    [className, closeTriggerClassName],
  );

  return (
    <CloseButton
      className={resolvedClassName}
      data-slot="alert-dialog-close-trigger"
      slot="close"
      {...rest}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogBackdrop,
  AlertDialogContainer,
  AlertDialogDialog,
  AlertDialogHeader,
  AlertDialogHeading,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogIcon,
  AlertDialogCloseTrigger,
};

export type {
  AlertDialogRootProps,
  AlertDialogTriggerProps,
  AlertDialogBackdropProps,
  AlertDialogContainerProps,
  AlertDialogDialogProps,
  AlertDialogHeaderProps,
  AlertDialogHeadingProps,
  AlertDialogBodyProps,
  AlertDialogFooterProps,
  AlertDialogIconProps,
  AlertDialogCloseTriggerProps,
  AlertDialogStatus,
};
