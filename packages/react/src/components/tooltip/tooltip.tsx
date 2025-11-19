"use client";

import type {TooltipVariants} from "./tooltip.styles";
import type {TooltipProps as TooltipPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";
import {
  Focusable as FocusablePrimitive,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {tooltipVariants} from "./tooltip.styles";

/* -------------------------------------------------------------------------------------------------
 * Tooltip Context
 * -----------------------------------------------------------------------------------------------*/
type TooltipContext = {
  slots?: ReturnType<typeof tooltipVariants>;
};

const TooltipContext = createContext<TooltipContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tooltip Root
 * -----------------------------------------------------------------------------------------------*/
type TooltipRootProps = React.ComponentProps<typeof TooltipTriggerPrimitive>;

const TooltipRoot = ({
  children,
  ...props
}: React.ComponentProps<typeof TooltipTriggerPrimitive>) => {
  const slots = React.useMemo(() => tooltipVariants(), []);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Intercept clicks on any child element to close the tooltip
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    // Close tooltip when any child is clicked
    // This fixes the issue where tooltip stays open when clicking a button with popover
    if (rootRef.current && rootRef.current.contains(e.target as Node)) {
      // Dispatch a mouseLeave event to trigger React Aria's tooltip close logic
      const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true, cancelable: true });
      e.currentTarget.dispatchEvent(mouseLeaveEvent);
    }
  }, []);

  const contextValue = React.useMemo(() => ({
    slots,
  }), [slots]);

  return (
    <TooltipContext value={contextValue}>
      <TooltipTriggerPrimitive
        ref={rootRef}
        data-slot="tooltip-root"
        {...props}
        onClick={handleClick}
      >
        {children}
      </TooltipTriggerPrimitive>
    </TooltipContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tooltip Content
 * -----------------------------------------------------------------------------------------------*/
interface TooltipContentProps extends Omit<TooltipPrimitiveProps, "children">, TooltipVariants {
  showArrow?: boolean;
  children: React.ReactNode;
}

const TooltipContent = ({
  children,
  className,
  offset: offsetProp,
  showArrow = false,
  ...props
}: TooltipContentProps) => {
  const {slots} = useContext(TooltipContext);
  const offset = offsetProp ? offsetProp : showArrow ? 7 : 3;

  return (
    <TooltipPrimitive
      {...props}
      className={composeTwRenderProps(className, slots?.base())}
      offset={offset}
    >
      {children}
    </TooltipPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tooltip Arrow
 * -----------------------------------------------------------------------------------------------*/
type TooltipArrowProps = Omit<React.ComponentProps<typeof OverlayArrow>, "children"> & {
  children?: React.ReactNode;
};

const TooltipArrow = ({children, className, ...props}: TooltipArrowProps) => {
  const defaultArrow = (
    <svg data-slot="overlay-arrow" height={12} viewBox="0 0 12 12" width={12}>
      <path d="M0 0 Q6 9 12 0" />
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
    <OverlayArrow data-slot="tooltip-arrow" {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tooltip Trigger
 * -----------------------------------------------------------------------------------------------*/
interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const TooltipTrigger = ({asChild = false, children, className, ...props}: TooltipTriggerProps) => {
  const {slots} = useContext(TooltipContext);
  const Comp = asChild ? SlotPrimitive : "div";

  return (
    <FocusablePrimitive>
      <Comp
        className={slots?.trigger({className})}
        data-slot="tooltip-trigger"
        role="button"
        {...props}
      >
        {children}
      </Comp>
    </FocusablePrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow};

export type {TooltipRootProps, TooltipArrowProps, TooltipContentProps, TooltipTriggerProps};
