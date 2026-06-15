"use client";

import type {UseOverlayStateProps, UseOverlayStateReturn} from "../../hooks/use-overlay-state";
import type {DOMRenderProps} from "../../utils/dom";
import type {DrawerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components/Button";
import type {DialogProps as DialogPrimitiveProps} from "react-aria-components/Dialog";

import {drawerVariants} from "@heroui/styles";
import {mergeProps} from "@react-aria/utils";
import React, {createContext, memo, useCallback, useContext, useMemo, useRef} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {
  Dialog as DialogPrimitive,
  DialogTrigger as DrawerTriggerPrimitive,
  Heading as HeadingPrimitive,
  OverlayTriggerStateContext,
} from "react-aria-components/Dialog";
import {
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
} from "react-aria-components/Modal";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CloseButton} from "../close-button";
import {SurfaceContext, defaultSurfaceContextValue} from "../surface";

type DrawerPlacement = "top" | "bottom" | "left" | "right";

/* -------------------------------------------------------------------------------------------------
 * Drawer Drag Hook
 * Tracks pointer events to enable drag-to-dismiss with CSS transforms.
 * Drag only initiates from handle/header/footer areas — body is excluded to avoid scroll conflicts.
 * -----------------------------------------------------------------------------------------------*/

const DRAG_THRESHOLD = 8; // px before drag activates
const DISMISS_FRACTION = 0.3; // dismiss if dragged > 30% of dimension
const VELOCITY_THRESHOLD = 0.5; // px/ms — dismiss on fast flick

function useDrawerDrag(placement: DrawerPlacement | undefined, isDismissable: boolean) {
  const overlayState = useContext(OverlayTriggerStateContext);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isActive = useRef(false);
  const startPos = useRef(0);
  const currentOffset = useRef(0);
  const velocity = useRef(0);
  const lastTime = useRef(0);
  const lastPos = useRef(0);

  const isVertical = placement === "top" || placement === "bottom";

  const getPos = useCallback(
    (e: React.PointerEvent) => (isVertical ? e.clientY : e.clientX),
    [isVertical],
  );

  const clamp = useCallback(
    (delta: number) => {
      // Only allow drag in the dismiss direction
      switch (placement) {
        case "bottom":
          return Math.max(0, delta);
        case "top":
          return Math.min(0, delta);
        case "right":
          return Math.max(0, delta);
        case "left":
          return Math.min(0, delta);
        default:
          return delta;
      }
    },
    [placement],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isDismissable) return;
      if (e.button !== 0) return;

      const target = e.target as HTMLElement;

      // Don't drag from interactive elements or scrollable body
      if (
        target.closest(
          "input, textarea, button, [role='button'], select, a, [data-slot='drawer-body']",
        )
      ) {
        return;
      }

      isDragging.current = true;
      isActive.current = false;
      startPos.current = getPos(e);
      lastPos.current = startPos.current;
      lastTime.current = Date.now();
      currentOffset.current = 0;
      velocity.current = 0;
    },
    [getPos, isDismissable],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !dialogRef.current) return;

      const pos = getPos(e);
      const rawDelta = pos - startPos.current;
      const delta = clamp(rawDelta);

      // Activate only after passing threshold to avoid false starts
      if (!isActive.current) {
        if (Math.abs(rawDelta) < DRAG_THRESHOLD) return;
        isActive.current = true;
        dialogRef.current.style.transition = "none";
        dialogRef.current.setPointerCapture(e.pointerId);
      }

      currentOffset.current = delta;

      // Track velocity for flick detection
      const now = Date.now();
      const dt = now - lastTime.current;

      if (dt > 0) {
        velocity.current = (pos - lastPos.current) / dt;
        lastTime.current = now;
        lastPos.current = pos;
      }

      const axis = isVertical ? "Y" : "X";

      dialogRef.current.style.transform = `translate${axis}(${delta}px)`;
    },
    [getPos, clamp, isVertical],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const el = dialogRef.current;

      if (!el || !isActive.current) {
        isActive.current = false;

        return;
      }
      isActive.current = false;

      // Release pointer capture
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture may already be released
      }

      const dimension = isVertical ? el.offsetHeight : el.offsetWidth;
      const absOffset = Math.abs(currentOffset.current);
      const absVelocity = Math.abs(velocity.current);

      const shouldDismiss =
        absOffset > dimension * DISMISS_FRACTION || absVelocity > VELOCITY_THRESHOLD;

      if (shouldDismiss && overlayState) {
        // Keep the inline transform — it compounds with the content exit animation
        // so the drawer continues sliding from the dragged position
        overlayState.close();
      } else {
        // Snap back with a spring-like ease
        el.style.transition = "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)";
        el.style.transform = "";

        const cleanup = () => {
          el.style.transition = "";
        };

        el.addEventListener("transitionend", cleanup, {once: true});
      }

      currentOffset.current = 0;
      velocity.current = 0;
    },
    [isVertical, overlayState],
  );

  return {
    dialogRef,
    dragHandlers: isDismissable
      ? {
          onPointerDown,
          onPointerMove,
          onPointerUp,
        }
      : {},
  };
}

/* -------------------------------------------------------------------------------------------------
 * Drawer Context
 * -----------------------------------------------------------------------------------------------*/
type DrawerContext = {
  backdropClassName?: string;
  bodyClassName?: string;
  closeTriggerClassName?: string;
  contentClassName?: string;
  dialogClassName?: string;
  footerClassName?: string;
  handleClassName?: string;
  headerClassName?: string;
  headingClassName?: string;
  isDismissable?: boolean;
  placement?: DrawerPlacement;
  triggerClassName?: string;
};

const DrawerContext = createContext<DrawerContext>({});

const createDrawerContextFromSlots = (
  slots: ReturnType<typeof drawerVariants>,
  prev: DrawerContext = {},
): DrawerContext => ({
  ...prev,
  backdropClassName: slots.backdrop(),
  bodyClassName: slots.body(),
  closeTriggerClassName: slots.closeTrigger(),
  contentClassName: slots.content(),
  dialogClassName: slots.dialog(),
  footerClassName: slots.footer(),
  handleClassName: slots.handle(),
  headerClassName: slots.header(),
  headingClassName: slots.heading(),
  triggerClassName: slots.trigger(),
});

/* -------------------------------------------------------------------------------------------------
 * Drawer Root
 * -----------------------------------------------------------------------------------------------*/
interface DrawerRootProps extends ComponentPropsWithRef<typeof DrawerTriggerPrimitive> {
  state?: UseOverlayStateReturn;
}

const DrawerRoot = memo(function DrawerRoot({children, state, ...props}: DrawerRootProps) {
  const slots = useMemo(() => drawerVariants(), []);
  const drawerContext = useMemo<DrawerContext>(
    () => ({...createDrawerContextFromSlots(slots), placement: undefined, isDismissable: true}),
    [slots],
  );

  const controlledProps = useMemo<UseOverlayStateProps>(
    () => (state ? {isOpen: state.isOpen, onOpenChange: state.setOpen} : {}),
    [state],
  );

  return (
    <DrawerContext value={drawerContext}>
      <DrawerTriggerPrimitive data-slot="drawer-root" {...mergeProps(props, controlledProps)}>
        {children}
      </DrawerTriggerPrimitive>
    </DrawerContext>
  );
});

DrawerRoot.displayName = "HeroUI.Drawer";

/* -------------------------------------------------------------------------------------------------
 * Drawer Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DrawerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const DrawerTrigger = memo(function DrawerTrigger({
  children,
  className,
  ...props
}: DrawerTriggerProps) {
  const {triggerClassName} = useContext(DrawerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName),
    [className, triggerClassName],
  );

  return (
    <ButtonPrimitive className={resolvedClassName} data-slot="drawer-trigger" {...props}>
      {children}
    </ButtonPrimitive>
  );
});

DrawerTrigger.displayName = "HeroUI.Drawer.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Drawer Backdrop
 * -----------------------------------------------------------------------------------------------*/
interface DrawerBackdropProps extends ComponentPropsWithRef<typeof ModalOverlayPrimitive> {
  variant?: DrawerVariants["variant"];
  /**
   * Whether to close the drawer when the user interacts outside it.
   * @default true
   */
  isDismissable?: boolean;
}

const DrawerBackdrop = memo(function DrawerBackdrop({
  children,
  className,
  isDismissable = true,
  variant,
  ...props
}: DrawerBackdropProps) {
  const contextValue = useContext(DrawerContext);

  const updatedSlots = useMemo(() => drawerVariants({variant}), [variant]);

  const updatedDrawerContext = useMemo<DrawerContext>(
    () => ({
      ...contextValue,
      backdropClassName: updatedSlots.backdrop(),
      isDismissable,
    }),
    [contextValue, updatedSlots, isDismissable],
  );

  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, updatedSlots.backdrop()),
    [className, updatedSlots],
  );

  return (
    <ModalOverlayPrimitive
      className={resolvedClassName}
      data-slot="drawer-backdrop"
      isDismissable={isDismissable}
      {...props}
    >
      {(renderProps) => (
        <DrawerContext value={updatedDrawerContext}>
          {typeof children === "function" ? children(renderProps) : children}
        </DrawerContext>
      )}
    </ModalOverlayPrimitive>
  );
});

DrawerBackdrop.displayName = "HeroUI.Drawer.Backdrop";

/* -------------------------------------------------------------------------------------------------
 * Drawer Content
 * -----------------------------------------------------------------------------------------------*/
interface DrawerContentProps extends Omit<
  ComponentPropsWithRef<typeof ModalPrimitive>,
  Exclude<keyof DrawerBackdropProps, "children" | "className">
> {
  placement?: DrawerPlacement;
}

const DrawerContent = memo(function DrawerContent({
  children,
  className,
  placement = "bottom",
  ...props
}: DrawerContentProps) {
  const {isDismissable, ...contextValue} = useContext(DrawerContext);

  const updatedSlots = useMemo(() => drawerVariants({placement}), [placement]);

  const updatedDrawerContext = useMemo<DrawerContext>(
    () => ({
      ...contextValue,
      placement,
      isDismissable,
      contentClassName: updatedSlots.content(),
      dialogClassName: updatedSlots.dialog(),
    }),
    [contextValue, placement, isDismissable, updatedSlots],
  );

  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, updatedSlots.content()),
    [className, updatedSlots],
  );

  return (
    <ModalPrimitive
      className={resolvedClassName}
      data-placement={placement}
      data-slot="drawer-content"
      {...props}
    >
      {(renderProps) => (
        <DrawerContext value={updatedDrawerContext}>
          {typeof children === "function" ? children(renderProps) : children}
        </DrawerContext>
      )}
    </ModalPrimitive>
  );
});

DrawerContent.displayName = "HeroUI.Drawer.Content";

/* -------------------------------------------------------------------------------------------------
 * Drawer Dialog
 * -----------------------------------------------------------------------------------------------*/
interface DrawerDialogProps extends DialogPrimitiveProps {}

const DrawerDialog = memo(function DrawerDialog({
  children,
  className,
  ...props
}: DrawerDialogProps) {
  const {dialogClassName, isDismissable = true, placement} = useContext(DrawerContext);
  const {dialogRef, dragHandlers} = useDrawerDrag(placement, isDismissable);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, dialogClassName) as string,
    [className, dialogClassName],
  );
  const dialogStyle = useMemo(
    () => (isDismissable ? {touchAction: "none" as const} : undefined),
    [isDismissable],
  );

  return (
    <SurfaceContext value={defaultSurfaceContextValue}>
      <DialogPrimitive
        ref={dialogRef}
        className={resolvedClassName}
        data-placement={placement}
        data-slot="drawer-dialog"
        style={dialogStyle}
        {...dragHandlers}
        {...props}
      >
        {children}
      </DialogPrimitive>
    </SurfaceContext>
  );
});

DrawerDialog.displayName = "HeroUI.Drawer.Dialog";

/* -------------------------------------------------------------------------------------------------
 * Drawer Header
 * -----------------------------------------------------------------------------------------------*/
interface DrawerHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function DrawerHeaderInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DrawerHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerHeaderProps<E>>) {
  const {headerClassName} = useContext(DrawerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerClassName) as string,
    [className, headerClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="drawer-header" {...(props as any)}>
      {children}
    </dom.div>
  );
}

DrawerHeaderInner.displayName = "HeroUI.Drawer.Header";

const DrawerHeader = memo(DrawerHeaderInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: DrawerHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerHeaderProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Drawer Body
 * -----------------------------------------------------------------------------------------------*/
interface DrawerBodyProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function DrawerBodyInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DrawerBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerBodyProps<E>>) {
  const {bodyClassName} = useContext(DrawerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, bodyClassName) as string,
    [className, bodyClassName],
  );

  return (
    <dom.div
      className={resolvedClassName}
      data-slot="drawer-body"
      style={{touchAction: "pan-y"}}
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
}

DrawerBodyInner.displayName = "HeroUI.Drawer.Body";

const DrawerBody = memo(DrawerBodyInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: DrawerBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerBodyProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Drawer Footer
 * -----------------------------------------------------------------------------------------------*/
interface DrawerFooterProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function DrawerFooterInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DrawerFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerFooterProps<E>>) {
  const {footerClassName} = useContext(DrawerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, footerClassName) as string,
    [className, footerClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="drawer-footer" {...(props as any)}>
      {children}
    </dom.div>
  );
}

DrawerFooterInner.displayName = "HeroUI.Drawer.Footer";

const DrawerFooter = memo(DrawerFooterInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: DrawerFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerFooterProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Drawer Heading
 * -----------------------------------------------------------------------------------------------*/
interface DrawerHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const DrawerHeading = memo(function DrawerHeading({
  children,
  className,
  ...props
}: DrawerHeadingProps) {
  const {headingClassName} = useContext(DrawerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headingClassName) as string,
    [className, headingClassName],
  );

  return (
    <HeadingPrimitive
      className={resolvedClassName}
      data-slot="drawer-heading"
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
});

DrawerHeading.displayName = "HeroUI.Drawer.Heading";

/* -------------------------------------------------------------------------------------------------
 * Drawer Handle
 * -----------------------------------------------------------------------------------------------*/
interface DrawerHandleProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function DrawerHandleInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: DrawerHandleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerHandleProps<E>>) {
  const {handleClassName} = useContext(DrawerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, handleClassName) as string,
    [className, handleClassName],
  );

  return (
    <dom.div
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="drawer-handle"
      {...(props as any)}
    >
      <div data-slot="drawer-handle-bar" />
    </dom.div>
  );
}

DrawerHandleInner.displayName = "HeroUI.Drawer.Handle";

const DrawerHandle = memo(DrawerHandleInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: DrawerHandleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerHandleProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Drawer Close Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DrawerCloseTriggerProps extends ButtonPrimitiveProps {
  className?: string;
  children?: ReactNode;
}

const DrawerCloseTrigger = memo(function DrawerCloseTrigger({
  className,
  ...rest
}: DrawerCloseTriggerProps) {
  const {closeTriggerClassName} = useContext(DrawerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, closeTriggerClassName),
    [className, closeTriggerClassName],
  );

  return (
    <CloseButton
      className={resolvedClassName}
      data-slot="drawer-close-trigger"
      slot="close"
      {...rest}
    />
  );
});

DrawerCloseTrigger.displayName = "HeroUI.Drawer.CloseTrigger";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DrawerRoot,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerContent,
  DrawerDialog,
  DrawerHeader,
  DrawerHeading,
  DrawerBody,
  DrawerFooter,
  DrawerHandle,
  DrawerCloseTrigger,
};

export type {
  DrawerRootProps,
  DrawerTriggerProps,
  DrawerBackdropProps,
  DrawerContentProps,
  DrawerDialogProps,
  DrawerHeaderProps,
  DrawerHeadingProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHandleProps,
  DrawerCloseTriggerProps,
};
