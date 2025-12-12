"use client";

import type {PopoverVariants} from "./popover.styles";
import type {SurfaceVariants} from "../surface";
import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext} from "react";
import {
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  OverlayArrow,
  Popover as PopoverPrimitive,
  DialogTrigger as PopoverTriggerPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

import {popoverVariants} from "./popover.styles";

/* -------------------------------------------------------------------------------------------------
 * Popover Context
 * -----------------------------------------------------------------------------------------------*/
type PopoverContext = {
  slots?: ReturnType<typeof popoverVariants>;
};

const PopoverContext = createContext<PopoverContext>({});

/* -------------------------------------------------------------------------------------------------
 * Popover Root
 * -----------------------------------------------------------------------------------------------*/
type PopoverRootProps = ComponentPropsWithRef<typeof PopoverTriggerPrimitive>;

const PopoverRoot = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof PopoverTriggerPrimitive>) => {
  const slots = React.useMemo(() => popoverVariants(), []);

  return (
    <PopoverContext value={{slots}}>
      <PopoverTriggerPrimitive data-slot="popover-root" {...props}>
        {children}
      </PopoverTriggerPrimitive>
    </PopoverContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Popover Content
 * -----------------------------------------------------------------------------------------------*/
interface PopoverContentProps
  extends Omit<ComponentPropsWithRef<typeof PopoverPrimitive>, "children">, PopoverVariants {
  children: React.ReactNode;
}

const PopoverContent = ({children, className, ...props}: PopoverContentProps) => {
  const {slots} = useContext(PopoverContext);

  return (
    <PopoverContext value={{slots}}>
      <SurfaceContext
        value={{
          variant: "default" as SurfaceVariants["variant"],
        }}
      >
        <PopoverPrimitive {...props} className={composeTwRenderProps(className, slots?.base())}>
          {children}
        </PopoverPrimitive>
      </SurfaceContext>
    </PopoverContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Popover Arrow
 * -----------------------------------------------------------------------------------------------*/
type PopoverArrowProps = Omit<ComponentPropsWithRef<typeof OverlayArrow>, "children"> & {
  children?: React.ReactNode;
};

const PopoverArrow = ({children, className, ...props}: PopoverArrowProps) => {
  const defaultArrow = (
    <svg data-slot="popover-overlay-arrow" height={12} viewBox="0 0 12 12" width={12}>
      <path d="M0 0 Q6 9 12 0" />
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
};

/* -------------------------------------------------------------------------------------------------
 * Popover Dialog
 * -----------------------------------------------------------------------------------------------*/
type PopoverDialogProps = Omit<ComponentPropsWithRef<typeof DialogPrimitive>, "children"> & {
  children: React.ReactNode;
};

const PopoverDialog = ({children, className, ...props}: PopoverDialogProps) => {
  const {slots} = useContext(PopoverContext);

  return (
    <DialogPrimitive data-slot="popover-dialog" {...props} className={slots?.dialog({className})}>
      {children}
    </DialogPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Popover Trigger
 * -----------------------------------------------------------------------------------------------*/
type PopoverTriggerProps = ComponentPropsWithRef<"div">;

const PopoverTrigger = ({children, className, ...props}: PopoverTriggerProps) => {
  const {slots} = useContext(PopoverContext);

  return (
    <PressablePrimitive>
      <div
        className={slots?.trigger({className})}
        data-slot="popover-trigger"
        role="button"
        {...props}
      >
        {children}
      </div>
    </PressablePrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Popover Heading
 * -----------------------------------------------------------------------------------------------*/
type PopoverHeadingProps = ComponentPropsWithRef<typeof HeadingPrimitive> & {};

const PopoverHeading = ({children, className, ...props}: PopoverHeadingProps) => {
  const {slots} = useContext(PopoverContext);

  return (
    <HeadingPrimitive slot="title" {...props} className={slots?.heading({className})}>
      {children}
    </HeadingPrimitive>
  );
};

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
