"use client";

import type {ToastContentValue} from "./toast-queue";
import type {ToastVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";
import type {QueuedToast, ToastProps as ToastPrimitiveProps} from "react-aria-components";

import {toastVariants} from "@heroui/styles";
import React, {createContext, useCallback, useContext, useMemo} from "react";
import {
  Button as ButtonPrimitive,
  Text as TextPrimitive,
  UNSTABLE_ToastContent as ToastContentPrimitive,
  UNSTABLE_Toast as ToastPrimitive,
  UNSTABLE_ToastRegion as ToastRegionPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";

import {ToastQueue, toast as defaultToast} from "./toast-queue";

/* ------------------------------------------------------------------------------------------------
 * Toast Context
 * --------------------------------------------------------------------------------------------- */
type ToastContext = {
  slots?: ReturnType<typeof toastVariants>;
  variant?: ToastVariants["variant"];
};

const ToastContext = createContext<ToastContext>({});

/* ------------------------------------------------------------------------------------------------
 * Toast
 * --------------------------------------------------------------------------------------------- */
interface ToastProps<T extends object = ToastContentValue>
  extends ToastPrimitiveProps<T>, ToastVariants {}

const Toast = <T extends object = ToastContentValue>({
  children,
  className,
  toast,
  variant = "default",
  ...rest
}: ToastProps<T>) => {
  const {slots: contextSlots} = useContext(ToastContext);

  const slots = useMemo(() => toastVariants({variant}), [variant]);

  const updatedContext = useMemo<ToastContext>(
    () => ({slots: {...contextSlots, ...slots}, variant}),
    [contextSlots, slots, variant],
  );

  const style = useMemo<CSSProperties>(
    () => ({viewTransitionName: toast?.key, ...rest.style}),
    [toast?.key, rest.style],
  );

  return (
    <ToastContext value={updatedContext}>
      <ToastPrimitive
        className={composeTwRenderProps(className, slots?.toast())}
        data-slot="toast"
        style={style}
        toast={toast}
        {...rest}
      >
        {children}
      </ToastPrimitive>
    </ToastContext>
  );
};

Toast.displayName = "HeroUI.Toast";

/* ------------------------------------------------------------------------------------------------
 * Toast Content
 * --------------------------------------------------------------------------------------------- */
interface ToastContentProps extends ComponentPropsWithRef<typeof ToastContentPrimitive> {}

const ToastContent = ({children, className, ...rest}: ToastContentProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <ToastContentPrimitive
      className={composeSlotClassName(slots?.content, className)}
      data-slot="toast-content"
      {...rest}
    >
      {children}
    </ToastContentPrimitive>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Toast Icon
 * --------------------------------------------------------------------------------------------- */
interface ToastIconProps extends ComponentPropsWithRef<"div"> {}

const ToastIcon = ({children, className, ...rest}: ToastIconProps) => {
  const {slots, variant} = useContext(ToastContext);

  const getDefaultIcon = useCallback(() => {
    switch (variant) {
      case "accent":
        return <InfoIcon data-slot="toast-default-icon" />;
      case "success":
        return <SuccessIcon data-slot="toast-default-icon" />;
      case "warning":
        return <WarningIcon data-slot="toast-default-icon" />;
      case "danger":
        return <DangerIcon data-slot="toast-default-icon" />;
      default:
        return <InfoIcon data-slot="toast-default-icon" />;
    }
  }, [variant]);

  return (
    <div className={composeSlotClassName(slots?.icon, className)} data-slot="toast-icon" {...rest}>
      {children ?? getDefaultIcon()}
    </div>
  );
};

ToastIcon.displayName = "HeroUI.ToastIcon";

/* ------------------------------------------------------------------------------------------------
 * Toast Title
 * --------------------------------------------------------------------------------------------- */
interface ToastTitleProps extends ComponentPropsWithRef<typeof TextPrimitive> {}

const ToastTitle = ({children, className, ...rest}: ToastTitleProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <TextPrimitive
      className={composeSlotClassName(slots?.title, className)}
      data-slot="toast-title"
      slot="title"
      {...rest}
    >
      {children}
    </TextPrimitive>
  );
};

ToastTitle.displayName = "HeroUI.ToastTitle";

/* ------------------------------------------------------------------------------------------------
 * Toast Description
 * --------------------------------------------------------------------------------------------- */
interface ToastDescriptionProps extends ComponentPropsWithRef<typeof TextPrimitive> {}

const ToastDescription = ({children, className, ...rest}: ToastDescriptionProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <TextPrimitive
      className={composeSlotClassName(slots?.description, className)}
      data-slot="toast-description"
      slot="description"
      {...rest}
    >
      {children}
    </TextPrimitive>
  );
};

ToastDescription.displayName = "HeroUI.ToastDescription";

/* ------------------------------------------------------------------------------------------------
 * Toast Close
 * --------------------------------------------------------------------------------------------- */
interface ToastCloseProps extends ComponentPropsWithRef<typeof CloseButton> {}

const ToastClose = ({className, ...rest}: ToastCloseProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <CloseButton
      className={composeTwRenderProps(className, slots?.close())}
      data-slot="toast-close"
      slot="close"
      {...rest}
    />
  );
};

ToastClose.displayName = "HeroUI.ToastClose";

/* ------------------------------------------------------------------------------------------------
 * Toast Action
 * --------------------------------------------------------------------------------------------- */
interface ToastActionProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const ToastAction = ({children, className, ...rest}: ToastActionProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, slots?.action?.())}
      data-slot="toast-action"
      {...rest}
    >
      {children}
    </ButtonPrimitive>
  );
};

ToastAction.displayName = "HeroUI.ToastAction";

/* ------------------------------------------------------------------------------------------------
 * Toast Region
 * --------------------------------------------------------------------------------------------- */
type ToastRegionPrimitiveProps<T extends object = ToastContentValue> = ComponentPropsWithRef<
  typeof ToastRegionPrimitive<T>
>;

interface ToastRegionProps<T extends object = ToastContentValue> extends Omit<
  ToastRegionPrimitiveProps<T>,
  "queue" | "children"
> {
  toast?: ToastQueue<T>;
  placement?: ToastVariants["placement"];
  children?: ToastRegionPrimitiveProps<T>["children"];
}

const ToastRegion = <T extends object = ToastContentValue>({
  children,
  className,
  placement = "bottom-right",
  toast: toastProp,
  ...rest
}: ToastRegionProps<T>) => {
  const slots = useMemo(() => toastVariants({placement}), [placement]);

  const toast = useMemo(() => {
    if (toastProp) {
      return toastProp;
    }

    // defaultToast is a function with getQueue method
    return defaultToast as unknown as ToastQueue<T>;
  }, [toastProp]);

  const getDefaultChildren = useCallback((renderProps: {toast: QueuedToast<T>}) => {
    const {action, description, icon, title, variant} =
      (renderProps.toast.content as ToastContentValue) ?? {};

    return (
      <Toast toast={renderProps.toast} variant={variant || "default"}>
        {icon ? <ToastIcon>{icon}</ToastIcon> : <ToastIcon />}
        <ToastContent>
          {!!title && <ToastTitle>{title}</ToastTitle>}
          {!!description && <ToastDescription>{description}</ToastDescription>}
        </ToastContent>
        <div className="flex items-center gap-3 py-3">
          {action ? <ToastAction onPress={action.onClick}>{action.label}</ToastAction> : null}
          <ToastClose />
        </div>
      </Toast>
    );
  }, []);

  return (
    <ToastRegionPrimitive<T>
      className={composeTwRenderProps(className, slots?.region())}
      data-slot="toast-region"
      queue={toast.getQueue()}
      {...rest}
    >
      {(renderProps) => (
        <ToastContext value={{slots}}>
          {typeof children === "undefined"
            ? getDefaultChildren(renderProps)
            : typeof children === "function"
              ? children(renderProps)
              : children}
        </ToastContext>
      )}
    </ToastRegionPrimitive>
  );
};

ToastRegion.displayName = "HeroUI.ToastRegion";

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {
  ToastQueue,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastRegion,
  ToastTitle,
};

export type {
  ToastActionProps,
  ToastCloseProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIconProps,
  ToastProps,
  ToastRegionProps,
  ToastTitleProps,
};
