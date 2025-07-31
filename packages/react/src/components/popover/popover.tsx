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

const PopoverRoot = ({
  children,
  ...props
}: React.ComponentProps<typeof PopoverTriggerPrimitive>) => {
  const slots = React.useMemo(() => popoverVariants(), []);

  return (
    <PopoverContext.Provider value={{slots}}>
      <PopoverTriggerPrimitive data-popover-root {...props}>
        {children}
      </PopoverTriggerPrimitive>
    </PopoverContext.Provider>
  );
};

PopoverRoot.displayName = "HeroUI.Popover";

/* -----------------------------------------------------------------------------------------------*/

interface PopoverContentProps extends Omit<PopoverPrimitiveProps, "children">, PopoverVariants {
  children: React.ReactNode;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive>,
  PopoverContentProps
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(PopoverContext);

  return (
    <PopoverContext.Provider value={{slots}}>
      <PopoverPrimitive
        {...props}
        ref={ref}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {children}
      </PopoverPrimitive>
    </PopoverContext.Provider>
  );
});

PopoverContent.displayName = "HeroUI.PopoverContent";

/* -----------------------------------------------------------------------------------------------*/

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof OverlayArrow>,
  Omit<React.ComponentProps<typeof OverlayArrow>, "children"> & {children?: React.ReactNode}
>(({children, className, ...props}, ref) => {
  const defaultArrow = (
    <svg data-overlay-arrow height={12} viewBox="0 0 12 12" width={12}>
      <path d="M0 0 L6 6 L12 0" />
    </svg>
  );

  const arrow = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<{className?: string; "data-overlay-arrow"?: boolean}>,
        {
          "data-overlay-arrow": true,
        },
      )
    : defaultArrow;

  return (
    <OverlayArrow ref={ref} data-popover-overlay {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
});

PopoverArrow.displayName = "HeroUI.PopoverArrow";

/* -----------------------------------------------------------------------------------------------*/

const PopoverDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive>,
  Omit<React.ComponentProps<typeof DialogPrimitive>, "children"> & {children: React.ReactNode}
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(PopoverContext);

  return (
    <DialogPrimitive
      ref={ref}
      data-popover-dialog
      {...props}
      className={slots?.dialog({className})}
    >
      {children}
    </DialogPrimitive>
  );
});

PopoverDialog.displayName = "HeroUI.PopoverDialog";

/* -----------------------------------------------------------------------------------------------*/

const PopoverTrigger = ({children, className, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  const {slots} = useContext(PopoverContext);

  return (
    <PressablePrimitive>
      <div data-popover-trigger className={slots?.trigger({className})} role="button" {...props}>
        {children}
      </div>
    </PressablePrimitive>
  );
};

PopoverTrigger.displayName = "HeroUI.PopoverTrigger";

/* -----------------------------------------------------------------------------------------------*/

const PopoverHeading = React.forwardRef<
  React.ElementRef<typeof HeadingPrimitive>,
  React.ComponentProps<typeof HeadingPrimitive>
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(PopoverContext);

  return (
    <HeadingPrimitive ref={ref} slot="title" {...props} className={slots?.heading({className})}>
      {children}
    </HeadingPrimitive>
  );
});

PopoverHeading.displayName = "HeroUI.PopoverHeading";

/* -----------------------------------------------------------------------------------------------*/

const CompoundPopover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Dialog: PopoverDialog,
  Arrow: PopoverArrow,
  Content: PopoverContent,
  Heading: PopoverHeading,
});

export default CompoundPopover;
export type {PopoverProps, PopoverContentProps};
