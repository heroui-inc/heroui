"use client";

import type {AlertDialogVariants} from "./alert-dialog.styles";
import type {ComponentPropsWithRef, HTMLAttributes} from "react";
import type {
  ButtonProps as ButtonPrimitiveProps,
  DialogProps as DialogPrimitiveProps,
} from "react-aria-components";

import {createContext, useContext, useMemo} from "react";
import {
  DialogTrigger as AlertDialogTriggerPrimitive,
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";

import {alertDialogVariants} from "./alert-dialog.styles";

type AlertDialogPlacement = "auto" | "top" | "center" | "bottom";

type AlertDialogStatus = "default" | "accent" | "success" | "warning" | "danger";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Context
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogContext = {
  slots?: ReturnType<typeof alertDialogVariants>;
  placement?: AlertDialogPlacement;
};

const AlertDialogContext = createContext<AlertDialogContext>({});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Root
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogRootProps extends ComponentPropsWithRef<typeof AlertDialogTriggerPrimitive> {}

const AlertDialogRoot = ({children, ...props}: AlertDialogRootProps) => {
  const alertDialogContext = useMemo<AlertDialogContext>(
    () => ({slots: alertDialogVariants(), placement: undefined}),
    [],
  );

  return (
    <AlertDialogContext value={alertDialogContext}>
      <AlertDialogTriggerPrimitive data-slot="alert-dialog-root" {...props}>
        {children}
      </AlertDialogTriggerPrimitive>
    </AlertDialogContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogTriggerProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogTrigger = ({children, className, ...props}: AlertDialogTriggerProps) => {
  const {slots} = useContext(AlertDialogContext);

  return (
    <PressablePrimitive>
      <div
        className={slots?.trigger({className})}
        data-slot="alert-dialog-trigger"
        role="button"
        {...props}
      >
        {children}
      </div>
    </PressablePrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Container
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogContainerProps extends ComponentPropsWithRef<typeof ModalPrimitive> {
  /**
   * The placement of the alert dialog on the screen.
   * @default "auto"
   */
  placement?: AlertDialogPlacement;
  /**
   * The visual variant of the backdrop overlay.
   * @default "solid"
   */
  backdropVariant?: AlertDialogVariants["variant"];
  /**
   * Additional CSS classes to apply to the backdrop overlay.
   */
  backdropClassName?: ComponentPropsWithRef<typeof ModalOverlayPrimitive>["className"];
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

const AlertDialogContainer = ({
  backdropClassName,
  backdropVariant = "solid",
  children,
  className,
  isDismissable = false,
  isKeyboardDismissDisabled = true,
  placement = "auto",
  ...props
}: AlertDialogContainerProps) => {
  const {slots: contextSlots} = useContext(AlertDialogContext);

  const updatedSlots = useMemo(
    () => alertDialogVariants({variant: backdropVariant}),
    [backdropVariant],
  );

  const updatedAlertDialogContext = useMemo<AlertDialogContext>(
    () => ({placement, slots: {...contextSlots, ...updatedSlots}}),
    [contextSlots, placement, updatedSlots],
  );

  return (
    <AlertDialogContext value={updatedAlertDialogContext}>
      <ModalOverlayPrimitive
        className={composeTwRenderProps(backdropClassName, updatedSlots?.backdrop())}
        data-slot="alert-dialog-backdrop"
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        {...props}
      >
        <ModalPrimitive
          className={composeTwRenderProps(className, updatedSlots?.container())}
          data-placement={placement}
          data-slot="alert-dialog-container"
        >
          {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
        </ModalPrimitive>
      </ModalOverlayPrimitive>
    </AlertDialogContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Dialog
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogDialogProps extends DialogPrimitiveProps {}

const AlertDialogDialog = ({children, className, ...props}: AlertDialogDialogProps) => {
  const {slots} = useContext(AlertDialogContext);

  return (
    <DialogPrimitive
      className={slots?.dialog({className})}
      data-slot="alert-dialog-dialog"
      role="alertdialog"
      {...props}
    >
      {children}
    </DialogPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Header
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogHeader = ({children, className, ...props}: AlertDialogHeaderProps) => {
  const {slots} = useContext(AlertDialogContext);

  return (
    <div className={slots?.header({className})} data-slot="alert-dialog-header" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Heading
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const AlertDialogHeading = ({children, className, ...props}: AlertDialogHeadingProps) => {
  const {slots} = useContext(AlertDialogContext);

  return (
    <HeadingPrimitive
      className={slots?.heading({className})}
      data-slot="alert-dialog-heading"
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Body
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogBodyProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogBody = ({children, className, ...props}: AlertDialogBodyProps) => {
  const {slots} = useContext(AlertDialogContext);

  return (
    <div className={slots?.body({className})} data-slot="alert-dialog-body" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Footer
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogFooter = ({children, className, ...props}: AlertDialogFooterProps) => {
  const {slots} = useContext(AlertDialogContext);

  return (
    <div className={slots?.footer({className})} data-slot="alert-dialog-footer" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Icon
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogIconProps extends ComponentPropsWithRef<"div"> {
  /**
   * The semantic status of the icon, affects background color and default icon
   * @default "danger"
   */
  status?: AlertDialogStatus;
}

const AlertDialogIcon = ({
  children,
  className,
  status = "danger",
  ...props
}: AlertDialogIconProps) => {
  const slots = useMemo(() => alertDialogVariants({status}), [status]);

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
    <div className={slots?.icon({className})} data-slot="alert-dialog-icon" {...props}>
      {children ?? getDefaultIcon()}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Close Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogCloseTriggerProps extends ButtonPrimitiveProps {}

const AlertDialogCloseTrigger = ({className, ...rest}: AlertDialogCloseTriggerProps) => {
  const {slots} = useContext(AlertDialogContext);

  return (
    <CloseButton
      className={composeTwRenderProps(className, slots?.closeTrigger())}
      data-slot="alert-dialog-close-trigger"
      slot="close"
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  AlertDialogRoot,
  AlertDialogTrigger,
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
