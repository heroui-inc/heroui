"use client";

import type {ToastVariants} from "./toast.styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";
import type {
  ToastProps as ToastPrimitiveProps,
  UNSTABLE_ToastQueue as ToastQueuePrimitiveType,
} from "react-aria-components";

import React, {createContext, useContext, useMemo} from "react";
import {
  Text as TextPrimitive,
  UNSTABLE_ToastContent as ToastContentPrimitive,
  UNSTABLE_Toast as ToastPrimitive,
  UNSTABLE_ToastQueue as ToastQueuePrimitive,
  UNSTABLE_ToastRegion as ToastRegionPrimitive,
} from "react-aria-components";
import {flushSync} from "react-dom";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";

import {toastVariants} from "./toast.styles";

/* ------------------------------------------------------------------------------------------------
 * Toast Context
 * --------------------------------------------------------------------------------------------- */
type ToastContext = {
  slots?: ReturnType<typeof toastVariants>;
  variant?: ToastVariants["variant"];
};

const ToastContext = createContext<ToastContext>({});

/* ------------------------------------------------------------------------------------------------
 * Toast Queue
 * --------------------------------------------------------------------------------------------- */
export interface ToastQueueOptions {
  wrapUpdate?: (fn: () => void) => void;
}

export class HeroUIToastQueue<T = any> {
  private queue: ToastQueuePrimitiveType<T>;

  constructor(options?: ToastQueueOptions) {
    this.queue = new ToastQueuePrimitive<T>({
      wrapUpdate: options?.wrapUpdate
        ? options.wrapUpdate
        : (fn) => {
            if ("startViewTransition" in document) {
              document.startViewTransition(() => {
                flushSync(fn);
              });
            } else {
              fn();
            }
          },
    });
  }

  add(content: T, options?: {timeout?: number; onClose?: () => void}): string {
    return this.queue.add(content, options);
  }

  close(key: string): void {
    this.queue.close(key);
  }

  getQueue(): ToastQueuePrimitiveType<T> {
    return this.queue;
  }
}

/* ------------------------------------------------------------------------------------------------
 * Toast Region
 * --------------------------------------------------------------------------------------------- */
interface ToastRegionProps extends Omit<
  ComponentPropsWithRef<typeof ToastRegionPrimitive>,
  "queue"
> {
  queue: HeroUIToastQueue<any>;
  placement?: ToastVariants["placement"];
}

const ToastRegion = ({
  children,
  className,
  placement = "bottom-right",
  queue,
  ...rest
}: ToastRegionProps) => {
  const slots = useMemo(() => toastVariants({placement}), [placement]);

  return (
    <ToastRegionPrimitive
      className={composeTwRenderProps(className, slots?.region())}
      data-slot="toast-region"
      queue={queue.getQueue()}
      {...rest}
    >
      {({toast}) => (
        <ToastContext value={{slots, variant: undefined}}>
          {typeof children === "function" ? children({toast}) : children}
        </ToastContext>
      )}
    </ToastRegionPrimitive>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Toast
 * --------------------------------------------------------------------------------------------- */
interface ToastProps extends ToastPrimitiveProps<any>, ToastVariants {}

const Toast = ({children, className, toast, variant = "default", ...rest}: ToastProps) => {
  const {slots: contextSlots} = useContext(ToastContext);

  const slots = useMemo(() => toastVariants({variant}), [variant]);

  const updatedContext = useMemo<ToastContext>(
    () => ({slots: {...contextSlots, ...slots}, variant}),
    [contextSlots, slots, variant],
  );

  const style = {
    viewTransitionName: toast?.key,
    ...rest.style,
  } as CSSProperties;

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

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {
  HeroUIToastQueue as ToastQueue,
  Toast,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastRegion,
  ToastTitle,
};

export type {
  ToastCloseProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastProps,
  ToastRegionProps,
  ToastTitleProps,
};
