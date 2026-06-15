"use client";

import type {UseOverlayStateProps, UseOverlayStateReturn} from "../../hooks/use-overlay-state";
import type {DOMRenderProps} from "../../utils/dom";
import type {ModalVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {Button as ButtonPrimitive} from "react-aria-components/Button";
import type {DialogProps as DialogPrimitiveProps} from "react-aria-components/Dialog";

import {modalVariants} from "@heroui/styles";
import {mergeProps} from "@react-aria/utils";
import React, {createContext, memo, useCallback, useContext, useMemo} from "react";
import {
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  DialogTrigger as ModalTriggerPrimitive,
} from "react-aria-components/Dialog";
import {
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components/Modal";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CloseButton} from "../close-button";
import {SurfaceContext, defaultSurfaceContextValue} from "../surface";

type ModalPlacement = "auto" | "top" | "center" | "bottom";

/* -------------------------------------------------------------------------------------------------
 * Modal Context
 * -----------------------------------------------------------------------------------------------*/
type ModalContext = {
  backdropClassName?: string;
  bodyClassName?: string;
  closeTriggerClassName?: string;
  containerClassName?: string;
  dialogClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
  headingClassName?: string;
  iconClassName?: string;
  placement?: ModalPlacement;
  triggerClassName?: string;
};

const ModalContext = createContext<ModalContext>({});

const createModalContextFromSlots = (
  slots: ReturnType<typeof modalVariants>,
  prev: ModalContext = {},
): ModalContext => ({
  ...prev,
  backdropClassName: slots.backdrop(),
  bodyClassName: slots.body(),
  closeTriggerClassName: slots.closeTrigger(),
  containerClassName: slots.container(),
  dialogClassName: slots.dialog(),
  footerClassName: slots.footer(),
  headerClassName: slots.header(),
  headingClassName: slots.heading(),
  iconClassName: slots.icon(),
  triggerClassName: slots.trigger(),
});

/* -------------------------------------------------------------------------------------------------
 * Modal Root
 * -----------------------------------------------------------------------------------------------*/
interface ModalRootProps extends ComponentPropsWithRef<typeof ModalTriggerPrimitive> {
  state?: UseOverlayStateReturn;
}

const ModalRoot = memo(function ModalRoot({children, state, ...props}: ModalRootProps) {
  const slots = useMemo(() => modalVariants(), []);
  const modalContext = useMemo<ModalContext>(() => createModalContextFromSlots(slots), [slots]);

  const controlledProps = useMemo<UseOverlayStateProps>(
    () => (state ? {isOpen: state.isOpen, onOpenChange: state.setOpen} : {}),
    [state],
  );

  return (
    <ModalContext value={modalContext}>
      <ModalTriggerPrimitive data-slot="modal-root" {...mergeProps(props, controlledProps)}>
        {children}
      </ModalTriggerPrimitive>
    </ModalContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Modal Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ModalTriggerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ModalTriggerInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalTriggerProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalTriggerProps<E>>) {
  const {triggerClassName} = useContext(ModalContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName) as string,
    [className, triggerClassName],
  );

  return (
    <PressablePrimitive>
      <dom.div
        className={resolvedClassName}
        data-slot="modal-trigger"
        role="button"
        {...(props as any)}
      >
        {children}
      </dom.div>
    </PressablePrimitive>
  );
}

const ModalTrigger = memo(ModalTriggerInner) as typeof ModalTriggerInner;

/* -------------------------------------------------------------------------------------------------
 * Modal Backdrop
 * -----------------------------------------------------------------------------------------------*/
interface ModalBackdropProps extends ComponentPropsWithRef<typeof ModalOverlayPrimitive> {
  variant?: ModalVariants["variant"];
  /**
   * Whether to close the modal when the user interacts outside it.
   * @default true
   */
  isDismissable?: boolean;
}

const ModalBackdrop = memo(function ModalBackdrop({
  children,
  className,
  isDismissable = true,
  onClick,
  variant,
  ...props
}: ModalBackdropProps) {
  const contextValue = useContext(ModalContext);

  const updatedSlots = useMemo(() => modalVariants({variant}), [variant]);

  const updatedModalContext = useMemo<ModalContext>(
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
      data-slot="modal-backdrop"
      isDismissable={isDismissable}
      onClick={handleClick}
      {...props}
    >
      {(renderProps) => (
        <ModalContext value={updatedModalContext}>
          {typeof children === "function" ? children(renderProps) : children}{" "}
        </ModalContext>
      )}
    </ModalOverlayPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Modal Container
 * -----------------------------------------------------------------------------------------------*/
interface ModalContainerProps extends Omit<
  ComponentPropsWithRef<typeof ModalPrimitive>,
  Exclude<keyof ModalBackdropProps, "children" | "className">
> {
  placement?: ModalPlacement;
  scroll?: ModalVariants["scroll"];
  size?: ModalVariants["size"];
}

const ModalContainer = memo(function ModalContainer({
  children,
  className,
  placement = "auto",
  scroll,
  size,
  ...props
}: ModalContainerProps) {
  const contextValue = useContext(ModalContext);

  const updatedSlots = useMemo(() => modalVariants({scroll, size}), [scroll, size]);

  const updatedModalContext = useMemo<ModalContext>(
    () => ({
      ...contextValue,
      placement,
      bodyClassName: updatedSlots.body(),
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
      data-slot="modal-container"
      {...props}
    >
      {(renderProps) => (
        <ModalContext value={updatedModalContext}>
          {typeof children === "function" ? children(renderProps) : children}
        </ModalContext>
      )}
    </ModalPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Modal Dialog
 * -----------------------------------------------------------------------------------------------*/
interface ModalDialogProps extends DialogPrimitiveProps {}

const ModalDialog = memo(function ModalDialog({children, className, ...props}: ModalDialogProps) {
  const {dialogClassName, placement} = useContext(ModalContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, dialogClassName) as string,
    [className, dialogClassName],
  );

  return (
    <SurfaceContext value={defaultSurfaceContextValue}>
      <DialogPrimitive
        className={resolvedClassName}
        data-placement={placement}
        data-slot="modal-dialog"
        {...props}
      >
        {children}
      </DialogPrimitive>
    </SurfaceContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Modal Header
 * -----------------------------------------------------------------------------------------------*/
interface ModalHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ModalHeaderInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalHeaderProps<E>>) {
  const {headerClassName} = useContext(ModalContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerClassName) as string,
    [className, headerClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="modal-header" {...(props as any)}>
      {children}
    </dom.div>
  );
}

const ModalHeader = memo(ModalHeaderInner) as typeof ModalHeaderInner;

/* -------------------------------------------------------------------------------------------------
 * Modal Body
 * -----------------------------------------------------------------------------------------------*/
interface ModalBodyProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ModalBodyInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalBodyProps<E>>) {
  const {bodyClassName} = useContext(ModalContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, bodyClassName) as string,
    [className, bodyClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="modal-body" {...(props as any)}>
      {children}
    </dom.div>
  );
}

const ModalBody = memo(ModalBodyInner) as typeof ModalBodyInner;

/* -------------------------------------------------------------------------------------------------
 * Modal Footer
 * -----------------------------------------------------------------------------------------------*/
interface ModalFooterProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ModalFooterInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalFooterProps<E>>) {
  const {footerClassName} = useContext(ModalContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, footerClassName) as string,
    [className, footerClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="modal-footer" {...(props as any)}>
      {children}
    </dom.div>
  );
}

const ModalFooter = memo(ModalFooterInner) as typeof ModalFooterInner;

/* -------------------------------------------------------------------------------------------------
 * Modal Heading
 * -----------------------------------------------------------------------------------------------*/
interface ModalHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const ModalHeading = memo(function ModalHeading({
  children,
  className,
  ...props
}: ModalHeadingProps) {
  const {headingClassName} = useContext(ModalContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headingClassName) as string,
    [className, headingClassName],
  );

  return (
    <HeadingPrimitive
      className={resolvedClassName}
      data-slot="modal-heading"
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Icon
 * -----------------------------------------------------------------------------------------------*/
interface ModalIconProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ModalIconInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalIconProps<E>>) {
  const {iconClassName} = useContext(ModalContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, iconClassName) as string,
    [className, iconClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="modal-icon" {...(props as any)}>
      {children}
    </dom.div>
  );
}

const ModalIcon = memo(ModalIconInner) as typeof ModalIconInner;

/* -------------------------------------------------------------------------------------------------
 * Modal Close Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ModalCloseTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children?: ReactNode;
}

const ModalCloseTrigger = memo(function ModalCloseTrigger({
  className,
  ...rest
}: ModalCloseTriggerProps) {
  const {closeTriggerClassName} = useContext(ModalContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, closeTriggerClassName),
    [className, closeTriggerClassName],
  );

  return (
    <CloseButton
      className={resolvedClassName}
      data-slot="modal-close-trigger"
      slot="close"
      {...rest}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  ModalRoot,
  ModalTrigger,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalIcon,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalCloseTrigger,
};

export type {
  ModalRootProps,
  ModalTriggerProps,
  ModalBackdropProps,
  ModalContainerProps,
  ModalDialogProps,
  ModalHeaderProps,
  ModalIconProps,
  ModalHeadingProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseTriggerProps,
};
