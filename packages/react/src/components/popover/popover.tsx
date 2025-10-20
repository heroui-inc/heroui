"use client";

import type {PopoverVariants} from "./popover.styles";
import type {PopoverProps as PopoverPrimitiveProps} from "react-aria-components";

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

import {popoverVariants} from "./popover.styles";

type PopoverProps = React.ComponentProps<typeof PopoverTriggerPrimitive>;

const PopoverContext = createContext<{
  slots?: ReturnType<typeof popoverVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Popover
 * -----------------------------------------------------------------------------------------------*/

const Popover = ({children, ...props}: React.ComponentProps<typeof PopoverTriggerPrimitive>) => {
  const slots = React.useMemo(() => popoverVariants(), []);

  return (
    <PopoverContext.Provider value={{slots}}>
      <PopoverTriggerPrimitive data-slot="popover-root" {...props}>
        {children}
      </PopoverTriggerPrimitive>
    </PopoverContext.Provider>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface PopoverContentProps extends Omit<PopoverPrimitiveProps, "children">, PopoverVariants {
  children: React.ReactNode;
}

const PopoverContent = ({children, className, ...props}: PopoverContentProps) => {
  const {slots} = useContext(PopoverContext);

  return (
    <PopoverContext.Provider value={{slots}}>
      <PopoverPrimitive {...props} className={composeTwRenderProps(className, slots?.base())}>
        {children}
      </PopoverPrimitive>
    </PopoverContext.Provider>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const PopoverArrow = ({
  children,
  className,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof OverlayArrow>, "children"> & {
  children?: React.ReactNode;
  ref?: React.Ref<React.ComponentRef<typeof OverlayArrow>>;
}) => {
  const defaultArrow = (
    <svg data-slot="overlay-arrow" height={12} viewBox="0 0 12 12" width={12}>
      <path d="M0 0 L6 6 L12 0" />
    </svg>
  );

  const arrow = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<{
          className?: string;
          "data-slot"?: "overlay-arrow";
        }>,
        {
          "data-slot": "overlay-arrow",
        },
      )
    : defaultArrow;

  return (
    <OverlayArrow ref={ref} data-slot="popover-overlay" {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const PopoverDialog = ({
  children,
  className,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive>, "children"> & {
  children: React.ReactNode;
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive>>;
}) => {
  const {slots} = useContext(PopoverContext);

  return (
    <DialogPrimitive
      ref={ref}
      data-slot="popover-dialog"
      {...props}
      className={slots?.dialog({className})}
    >
      {children}
    </DialogPrimitive>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const PopoverTrigger = ({children, className, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
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

/* -----------------------------------------------------------------------------------------------*/

const PopoverHeading = ({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<typeof HeadingPrimitive> & {
  ref?: React.Ref<React.ComponentRef<typeof HeadingPrimitive>>;
}) => {
  const {slots} = useContext(PopoverContext);

  return (
    <HeadingPrimitive ref={ref} slot="title" {...props} className={slots?.heading({className})}>
      {children}
    </HeadingPrimitive>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export {Popover, PopoverTrigger, PopoverDialog, PopoverArrow, PopoverContent, PopoverHeading};

export type {PopoverProps, PopoverContentProps};
