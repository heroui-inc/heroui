"use client";

import type {ToastContentValue} from "./toast-queue";
import type {ToastVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";
import type {QueuedToast, ToastProps as ToastPrimitiveProps} from "react-aria-components";

import {toastVariants} from "@heroui/styles";
import React, {createContext, useCallback, useContext, useMemo} from "react";
import {
  Text as TextPrimitive,
  UNSTABLE_ToastContent as ToastContentPrimitive,
  UNSTABLE_Toast as ToastPrimitive,
  UNSTABLE_ToastRegion as ToastRegionPrimitive,
  UNSTABLE_ToastStateContext as ToastStateContext,
} from "react-aria-components";

import {useMediaQuery} from "../../hooks";
import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {Button} from "../button";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";

import {DEFAULT_GAP, DEFAULT_MAX_VISIBLE_TOAST, DEFAULT_SCALE_FACTOR} from "./constants";
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
  extends ToastPrimitiveProps<T>, ToastVariants {
  scaleFactor?: number;
}

const Toast = <T extends object = ToastContentValue>({
  children,
  className,
  placement,
  scaleFactor = DEFAULT_SCALE_FACTOR,
  toast,
  variant,
  ...rest
}: ToastProps<T>) => {
  const {slots: contextSlots} = useContext(ToastContext);

  const slots = useMemo(() => toastVariants({variant, placement}), [variant, placement]);

  const state = useContext(ToastStateContext)!;
  const visibleToasts = state.visibleToasts;
  const index = visibleToasts.indexOf(toast);
  const isFrontmost = index <= 0;
  const isBottom = placement?.startsWith("bottom");

  const updatedContext = useMemo<ToastContext>(
    () => ({
      slots: {...contextSlots, ...slots},
      variant,
      index,
    }),
    [contextSlots, slots, variant, index],
  );

  const style = useMemo<CSSProperties>(
    () => ({
      viewTransitionName: toast?.key,
      translate: `0 ${94 * index * (isBottom ? 1 : -1)}% 0`,
      scale: 1 - index * scaleFactor,
      zIndex: visibleToasts.length - index - 1,
      tabindex: isFrontmost ? 0 : -1,
      ...rest.style,
    }),
    [index, toast?.key, rest.style, isBottom, visibleToasts.length, scaleFactor, isFrontmost],
  );

  return (
    <ToastContext value={updatedContext}>
      <ToastPrimitive
        className={composeTwRenderProps(className, slots?.toast())}
        data-frontmost={dataAttr(isFrontmost)}
        data-index={index}
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
 * Toast Indicator
 * --------------------------------------------------------------------------------------------- */
interface ToastIndicatorProps extends ComponentPropsWithRef<"div"> {}

const ToastIndicator = ({children, className, ...rest}: ToastIndicatorProps) => {
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
    <div
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="toast-indicator"
      {...rest}
    >
      {children ?? getDefaultIcon()}
    </div>
  );
};

ToastIndicator.displayName = "HeroUI.ToastIndicator";

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
 * Toast Close Button
 * --------------------------------------------------------------------------------------------- */
interface ToastCloseButtonProps extends ComponentPropsWithRef<typeof CloseButton> {}

const ToastCloseButton = ({className, ...rest}: ToastCloseButtonProps) => {
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

ToastCloseButton.displayName = "HeroUI.ToastCloseButton";

/* ------------------------------------------------------------------------------------------------
 * Toast Action Button
 * --------------------------------------------------------------------------------------------- */
interface ToastActionButtonProps extends ComponentPropsWithRef<typeof Button> {}

const ToastActionButton = ({children, className, ...rest}: ToastActionButtonProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <Button
      className={composeTwRenderProps(className, slots?.action?.())}
      data-slot="toast-action-button"
      {...rest}
    >
      {children}
    </Button>
  );
};

ToastActionButton.displayName = "HeroUI.ToastActionButton";

/* ------------------------------------------------------------------------------------------------
 * Toast Region
 * --------------------------------------------------------------------------------------------- */
type ToastRegionPrimitiveProps<T extends object = ToastContentValue> = ComponentPropsWithRef<
  typeof ToastRegionPrimitive<T>
>;

interface ToastContainerProps<T extends object = ToastContentValue> extends Omit<
  ToastRegionPrimitiveProps<T>,
  "queue" | "children"
> {
  children?: ToastRegionPrimitiveProps<T>["children"];
  /** The gap between toasts. @default 14 */
  gap?: number;
  /** The maximum number of toasts to display at a time. Only applies when no custom `toast` prop is provided. */
  maxVisibleToasts?: number;
  /** The scale factor for toasts. @default 0.05 */
  scaleFactor?: number;
  placement?: ToastVariants["placement"];
  toast?: ToastQueue<T>;
}

const ToastContainer = <T extends object = ToastContentValue>({
  children,
  className,
  gap = DEFAULT_GAP,
  maxVisibleToasts = DEFAULT_MAX_VISIBLE_TOAST,
  placement = "bottom",
  scaleFactor = DEFAULT_SCALE_FACTOR,
  toast: toastProp,
  ...rest
}: ToastContainerProps<T>) => {
  const slots = useMemo(() => toastVariants({placement}), [placement]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toast = useMemo(() => {
    if (toastProp) {
      // Custom toast prop provided - use it (it already has its own maxVisibleToasts limit)
      return toastProp;
    }

    // If maxVisibleToasts differs from default and no custom toast is provided,
    // create a new queue with the specified limit
    // Note: This queue will only receive toasts if you use a custom toast function
    // created with this queue. The default `toast()` function uses the default queue.
    if (maxVisibleToasts !== DEFAULT_MAX_VISIBLE_TOAST) {
      return new ToastQueue<T>({
        maxVisibleToasts,
      });
    }

    // Use default toast (which has DEFAULT_MAX_VISIBLE_TOAST limit)
    return defaultToast as unknown as ToastQueue<T>;
  }, [toastProp, maxVisibleToasts]);

  const getDefaultChildren = useCallback(
    (renderProps: {toast: QueuedToast<T>}) => {
      const {actionProps, description, indicator, title, variant} =
        (renderProps.toast.content as ToastContentValue) ?? {};

      return (
        <Toast
          placement={placement}
          scaleFactor={scaleFactor}
          toast={renderProps.toast}
          variant={variant}
        >
          {indicator ? <ToastIndicator>{indicator}</ToastIndicator> : <ToastIndicator />}
          <ToastContent>
            {!!title && <ToastTitle>{title}</ToastTitle>}
            {!!description && <ToastDescription>{description}</ToastDescription>}
            {isMobile && actionProps?.children ? (
              <ToastActionButton {...actionProps}>{actionProps.children}</ToastActionButton>
            ) : null}
          </ToastContent>
          {!isMobile && actionProps?.children ? (
            <ToastActionButton {...actionProps}>{actionProps.children}</ToastActionButton>
          ) : null}
          <ToastCloseButton />
        </Toast>
      );
    },
    [isMobile, placement, scaleFactor],
  );

  return (
    <ToastRegionPrimitive<T>
      className={composeTwRenderProps(className, slots?.region())}
      data-slot="toast-region"
      queue={toast.getQueue()}
      style={{
        // @ts-expect-error - CSS variables
        "--gap": `${gap}px`,
        "--scale-factor": scaleFactor,
        "--placement": placement,
      }}
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

ToastContainer.displayName = "HeroUI.ToastContainer";

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {
  ToastQueue,
  Toast,
  ToastActionButton,
  ToastCloseButton,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastContainer,
  ToastTitle,
};

export type {
  ToastActionButtonProps,
  ToastCloseButtonProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIndicatorProps,
  ToastProps,
  ToastContainerProps,
  ToastTitleProps,
};
