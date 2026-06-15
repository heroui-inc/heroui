"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {PopoverVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {popoverVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  DialogTrigger as PopoverTriggerPrimitive,
} from "react-aria-components/Dialog";
import {
  OverlayArrow,
  Popover as PopoverPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components/Popover";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Popover Context
 * -----------------------------------------------------------------------------------------------*/
type PopoverContext = {
  baseClassName?: string;
  dialogClassName?: string;
  headingClassName?: string;
  triggerClassName?: string;
};

const PopoverContext = createContext<PopoverContext>({});

/* -------------------------------------------------------------------------------------------------
 * Popover Root
 * -----------------------------------------------------------------------------------------------*/
type PopoverRootProps = ComponentPropsWithRef<typeof PopoverTriggerPrimitive>;

const PopoverRoot = memo(function PopoverRoot({
  children,
  ...props
}: ComponentPropsWithRef<typeof PopoverTriggerPrimitive>) {
  const slots = useMemo(() => popoverVariants(), []);
  const contextValue = useMemo<PopoverContext>(
    () => ({
      baseClassName: slots.base(),
      dialogClassName: slots.dialog(),
      headingClassName: slots.heading(),
      triggerClassName: slots.trigger(),
    }),
    [slots],
  );

  return (
    <PopoverContext value={contextValue}>
      <PopoverTriggerPrimitive data-slot="popover-root" {...props}>
        {children}
      </PopoverTriggerPrimitive>
    </PopoverContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Popover Content
 * -----------------------------------------------------------------------------------------------*/
interface PopoverContentProps
  extends Omit<ComponentPropsWithRef<typeof PopoverPrimitive>, "children">, PopoverVariants {
  children: React.ReactNode;
}

const PopoverContent = memo(function PopoverContent({
  children,
  className,
  ...props
}: PopoverContentProps) {
  const contextValue = useContext(PopoverContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contextValue.baseClassName),
    [className, contextValue.baseClassName],
  );

  return (
    <PopoverContext value={contextValue}>
      <SurfaceContext
        value={{
          variant: "default" as SurfaceVariants["variant"],
        }}
      >
        <PopoverPrimitive {...props} className={resolvedClassName}>
          {children}
        </PopoverPrimitive>
      </SurfaceContext>
    </PopoverContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Popover Arrow
 * -----------------------------------------------------------------------------------------------*/
type PopoverArrowProps = Omit<ComponentPropsWithRef<typeof OverlayArrow>, "children"> & {
  children?: React.ReactNode;
};

const PopoverArrow = memo(function PopoverArrow({
  children,
  className,
  ...props
}: PopoverArrowProps) {
  const defaultArrow = (
    <svg
      data-slot="popover-overlay-arrow"
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0C5.48483 8 6.5 8 12 0Z" />
    </svg>
  );

  const arrow = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<{
          className?: string;
          "data-slot"?: "popover-overlay-arrow";
        }>,
        {
          "data-slot": "popover-overlay-arrow",
        },
      )
    : defaultArrow;

  return (
    <OverlayArrow data-slot="popover-overlay-arrow-group" {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Popover Dialog
 * -----------------------------------------------------------------------------------------------*/
type PopoverDialogProps = Omit<ComponentPropsWithRef<typeof DialogPrimitive>, "children"> & {
  children: React.ReactNode;
};

const PopoverDialog = memo(function PopoverDialog({
  children,
  className,
  ...props
}: PopoverDialogProps) {
  const {dialogClassName} = useContext(PopoverContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, dialogClassName) as string,
    [className, dialogClassName],
  );

  return (
    <DialogPrimitive data-slot="popover-dialog" {...props} className={resolvedClassName}>
      {children}
    </DialogPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Popover Trigger
 * -----------------------------------------------------------------------------------------------*/
interface PopoverTriggerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function PopoverTriggerInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: PopoverTriggerProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof PopoverTriggerProps<E>>) {
  const {triggerClassName} = useContext(PopoverContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName) as string,
    [className, triggerClassName],
  );

  return (
    <PressablePrimitive>
      <dom.div
        className={resolvedClassName}
        data-slot="popover-trigger"
        role="button"
        {...(props as any)}
      >
        {children}
      </dom.div>
    </PressablePrimitive>
  );
}

const PopoverTrigger = memo(PopoverTriggerInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: PopoverTriggerProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof PopoverTriggerProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Popover Heading
 * -----------------------------------------------------------------------------------------------*/
type PopoverHeadingProps = ComponentPropsWithRef<typeof HeadingPrimitive> & {};

const PopoverHeading = memo(function PopoverHeading({
  children,
  className,
  ...props
}: PopoverHeadingProps) {
  const {headingClassName} = useContext(PopoverContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headingClassName) as string,
    [className, headingClassName],
  );

  return (
    <HeadingPrimitive slot="title" {...props} className={resolvedClassName}>
      {children}
    </HeadingPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {PopoverRoot, PopoverTrigger, PopoverDialog, PopoverArrow, PopoverContent, PopoverHeading};

export type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverDialogProps,
  PopoverArrowProps,
  PopoverContentProps,
  PopoverHeadingProps,
};
